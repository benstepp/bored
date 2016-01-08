import NodeFileSystem from 'fs'
import Bluebird from 'bluebird'

const FileSystem = Bluebird.promisifyAll(NodeFileSystem)

export default FileSystem
