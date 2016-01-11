import * as Nodes from '../nodes'
import { Quoting } from './quoting'

const AND = ' AND '
const EXCEPT = ' EXCEPT '
const AS = ' AS '
const INTERSECT = ' INTERSECT '
const CLOSE_PARENS = ')'
const PARTITION_BY = 'PARTITION BY '
const UNION_ALL = ' UNION ALL '
const COMMA = ', '
const EQUALS = ' = '
const EXISTS = 'EXISTS ('
const FALSE = 'FALSE'
const ROWS = 'ROWS'
const RANGE = 'RANGE'
const GROUP_BY = ' GROUP BY '
const HAVING = ' HAVING '
const INSERT_INTO = 'INSERT INTO '
const IS_NULL = ' IS NULL'
const ORDER_BY = ' ORDER BY '
const SELECT = 'SELECT'
const SET = ' SET '
const SPACE = ' '
const TRUE = 'TRUE'
const UPDATE = 'UPDATE '
const VALUES = 'VALUES ('
const DISTINCT = 'DISTINCT'
const WHERE = ' WHERE '
const WINDOW = ' WINDOW '
const WITH = 'WITH '
const WITH_RECURSIVE = 'WITH RECUSIVE '

class ToSql extends Quoting {

  visit_Attribute(node, collector) {
    const table_name = node.relation.name
    collector.push(`${this.quote_table_name(table_name)}.${this.quote_column_name(node.name)}`)
  }

  visit_Bin(node, collector) {
    node.accept(this, collector)
  }

  visit_Casted(node, collector) {
    collector.push(this.quoted(node.value, node.attribute))
  }

  visit_DeleteStatement(node, collector) {
    collector.push(DELETE_FROM)
    node.relation.accept(this.collector)
    this.maybe_visit_many(node.wheres, collector, { prefix: WHERE, delimiter: AND })
    this.maybe_visit(node.limit, collector)
  }

  visit_Distinct(node, collector) {
    collector.push(DISTINCT)
  }

  visit_DistinctOn(node, collector) {
    throw new Error('DISTINCT ON not implemented for this Database.')
  }

  visit_Equality(node, collector) {
    node.left.accept(this, collector)
    if (node.right === null) {
      collector.push(IS_NULL)
    } else {
      collector.push(EQUALS)
      node.right.accept(this, collector)
    }
  }

  visit_Except(node, collector) {
    collector.push('( ')
    infix_value(node, collector, EXCEPT)
    collector.push(' )')
  }

  visit_Exisits(node, collector) {
    collector.push(EXISTS)
    node.expressions.accept(this, collector)
    collector.push(CLOSE_PARENS)
    this.maybe_visit(node.alias, collector, {prefix: AS})
  }

  visit_False(node, collector) {
    collector.push(FALSE)
  }

  visit_InsertStatement(node, collector) {
    collector.push(INSERT_INTO)
    node.relation.accept(this, collector)

    if (node.columns.length > 0) {
      collector.push(` (${node.columns.map(column => { this.quote_column_name(column.name) }).join(COMMA)})`)
    }

    if (node.values) {
      this.maybe_visit(node.values, collector)
    } else if (node.select) {
      this.maybe_visit(node.select, collector)
    }
  }

  visit_Intersect(node, collector) {
    collector.push('( ')
    this.infix_value(node, collector, INTERSECT)
    collector.push(' )')
  }

    visit_JoinSource(node, collector) {
      if (node.left) { node.left.accept(this, collector) }
      if (node.right.length > 0) {
        if (node.left) { collector.push(SPACE) }
        this.inject_join(node.right, collector, SPACE)
      }
    }

    visit_NamedWindow(node, collector) {
      collector.push(this.quote_colun_name(node.name))
      collector.push(AS)
      this.visit_Window(node, collector)
    }

    visit_Quoted(node, collector) {
      collector.push(this.quoted(node.expression, null).toString())
    }

    visit_Range(node, collector) {
      collector.push(RANGE)
      this.maybe_visit(o.expr, collector)
    }

    visit_Rows(node, collector) {
      collector.push(ROWS)
      this.maybe_visit(o.expr, collector)
    }

    visit_SelectCore(node, collector) {
      collector.push(SELECT)
      this.maybe_visit(node.top, collector)
      this.maybe_visit(node.set_quantifier, collector)
      this.maybe_visit_many(node.projections, collector, { prefix: SPACE, delimiter: COMMA })

      if (node.source && !node.source.empty) {
        collector.push(' FROM ')
        node.source.accept(this, collector)
      }

      this.maybe_visit_many(node.wheres, collector, { prefix: WHERE, delimiter: AND })
      this.maybe_visit_many(node.groups, collector, { prefix: GROUP_BY, delimiter: COMMA })
      this.maybe_visit_many(node.havings, collector, { prefix: HAVING, delimiter: AND })
      this.maybe_visit_many(node.windows, collector, { prefix: WINDOW, delimiter: COMMA })
    }

    visit_SelectStatement(node, collector) {
      this.maybe_visit(node.with, collector)
      node.cores.map(core => { core.accept(this, collector) })
      this.maybe_visit_many(node.orders, collector, { prefix: ORDER_BY, delimiter: COMMA })
      this.maybe_visit(node.limit, collector)
      this.maybe_visit(node.offset, collector)
      this.maybe_visit(node.lock, collector)
    }

    visit_SqlLiteral(node, collector) {
      collector.push(node.toString())
    }

    visit_Table(node, collector) {
      collector.push(this.quote_table_name(node.name))
    }

    visit_True(node, collector) {
      collector.push(TRUE)
    }

    visit_Union(node, collector) {
      collector.push('( ')
      this.infix_value(node, collector, UNION)
      collector.push(' )')
    }

    visit_UnionAll(node, collector) {
      collector.push('( ')
      this.infix_value(node, collector, UNION_ALL)
      collector.push(' )')
    }

    visit_UpdateStatement(node, collector) {
      let wheres
      if (node.orders.length === 0 && o.limit === null) {
        wheres = node.wheres
      } else {
        wheres = [new Nodes.In(node.key, [this.build_subselect(node.key, node)])]
      }

      collector.push(UPDATE)
      node.relation.accept(this, collector)
      this.maybe_visit_many(node.values, collector, { prefix: SET, delimiter: COMMA })
      this.maybe_visit_many(node.wheres, collector, { prefix: WHERE, delimiter: AND })
    }

    visit_Values(node, collector) {
      collector.push(VALUES)
      //todo crazy shit
      collector.push(CLOSE_PARENS)
    }

    visit_Window(node, collector) {
      collector.push('(')
      this.maybe_visit_many(node.partitions, collector, { prefix: PARTITION_BY, delimiter: COMMA })
      this.maybe_visit_many(node.orders, collector, { prefix: ORDER_BY, delimiter: COMMA })
      if (node.framing) {
      if (node.orders.length > 0 || node.partitions.length > 0) { collector.push(SPACE)}
        node.framing.accept(this, collector)
      }
      collector.push(')')
    }

    visit_With(node, collector) {
      collector.push(WITH)
      this.inject_join(node.children, collector, COMMA)
    }

    visit_WithRecursive(node, collector) {
      collector.push(WITH_RECURSIVE)
      this.inject_join(node.children, collector, COMMA)
    }

    infix_value(node, collector, value) {
      node.left.accept(this, collector)
      collector.push(value)
      node.right.accept(this.collector)
    }

    inject_join(nodes, collector, join_string) {
      this.maybe_visit_many(nodes, collector, { delimiter: join_string })
    }

    maybe_visit(node, collector, options = { prefix: SPACE }) {
      if (node) {
        collector.push(options.prefix)
        node.accept(this, collector)
      }
    }

    maybe_visit_many(nodes, collector, options = { prefix: '', delimiter: '' }) {
      const nodes_length = nodes.length
      const last_index = nodes_length - 1
      if (nodes_length > 0) {
        collector.push(options.prefix)
        nodes.forEach((node, index) => {
          node.accept(this, collector)
          if( index !== last_index ) { collector.push(options.delimiter) }
        })
      }
    }

    build_subselect(key, node) {
      const statement = new Nodes.SelectStatement
      const core = statement.cores.first
      core.froms = node.relation
      core.wheres = node.wheres
      core.projections = [key]
      statement.limit = node.limit
      statement.orders = node.orders
      return statement
    }

  }
