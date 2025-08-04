/**
 * Lists the names of layers in the active Photoshop document.
 */
if (app.documents.length > 0) {
  var doc = app.activeDocument;
  var names = [];
  for (var i = 0; i < doc.layers.length; i++) {
    names.push(doc.layers[i].name);
  }
  alert('Layers: ' + names.join(', '));
} else {
  alert('No document open');
}
