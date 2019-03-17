function joinSubQuery(collectionName, foreignField, alias = '', customJoinField = [], additional = []) {
  let objForeignField = {};
  if (foreignField.constructor === String) {
    objForeignField[foreignField === '_id' ? 'id' : foreignField] = `$${foreignField}`;
  } else {
    objForeignField = foreignField
  }
  const joinField = (
    customJoinField.length < 1 ?
      [{'$eq': ['$_id', `$$${foreignField}`]}] :
      customJoinField
  );
  const pipeline = [
    {
      $match: {
        $expr: {
          $and: joinField
        }
      }
    }
  ].concat(additional);
  return {
    $lookup: {
      "from": collectionName,
      "let": objForeignField,
      pipeline: pipeline,
      as: alias ? alias : collectionName
    }
  }
}

module.exports = {
  joinSubQuery,
};