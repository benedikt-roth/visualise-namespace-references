const ts = require('typescript');

const getImportIdentifiers = (sourceFile) => {
  const identifierList = [];
  findImports(sourceFile)
  return identifierList;

  function findImports(node) {
    switch(node.kind) {
      case ts.SyntaxKind.ImportSpecifier:
        identifierList.push(node.name.escapedText);
        break;
      case ts.SyntaxKind.NamespaceImport:
        identifierList.push(node.name.escapedText);
        break;
      case ts.SyntaxKind.ImportEqualsDeclaration:
        identifierList.push(node.name.escapedText);
        break;
    }

    ts.forEachChild(node, findImports);
  }
}

const getAllReferenceCandidates = (sourceFile) => {
  const visitedNodes = [];
  const references = [];
  getReferences(sourceFile);
  return references;

  function getReferences(node) {
    if (visitedNodes.includes(node)) return;

    switch (node.kind) {
      case ts.SyntaxKind.PropertyAccessExpression:
        references.push(node.getText());
        break;
      case ts.SyntaxKind.QualifiedName:
        references.push(node.getText());
        break;
      default:
        ts.forEachChild(node, getReferences);
    }

    visitedNodes.push(node);
  };
};

const getNamespaceReferenceCount = (sourceFile) => {
  const imports = getImportIdentifiers(sourceFile);
  const referenceCandidates = getAllReferenceCandidates(sourceFile);

  return referenceCandidates.filter(reference =>
    !imports.find((obj) => reference.indexOf(`${obj}.`) === 0));
}

module.exports = {
  getNamespaceReferenceCount,
};
