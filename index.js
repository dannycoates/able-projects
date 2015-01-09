var glob = require('glob')
var path = require('path')
var p = require('./package.json')

function loadExperiments(projectName) {
  var basePath = path.resolve(__dirname, 'node_modules', projectName)
  var filenames = glob.sync(basePath + '/**/*.js')
  var experiments = []
  for (var i = 0; i < filenames.length; i++) {
    var filename = filenames[i]
    experiments.push(require(filename))
  }
  return {
    experiments: experiments,
    defaults: require(path.resolve(basePath, 'defaults.json'))
  }
}

var projects = {}
var projectNames = Object.keys(p.dependencies)
for (var i = 0; i < projectNames.length; i++) {
  var name = projectNames[i]
  if (name !== 'glob') {
    projects[name] = loadExperiments(name)
  }
}

module.exports = projects
