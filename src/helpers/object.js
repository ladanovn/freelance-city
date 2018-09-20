import lodash from 'lodash'

exports.pickProps = function(object, arrProps) {
  return _.pick(object, arrProps)
}

exports.omitProps = function(object, arrProps) {
  return _.omit(object, arrProps)
}