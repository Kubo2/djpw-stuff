# DJPW Extensions

This is an API in front of few extensions, to allow their easy linking to your [DJPW](http://diskuse.jakpsatweb.cz) account. Linking an extension from this repository is as easy as:

```html
<script src='https://rawgit.com/Kubo2/djpw-stuff/master/loader.js'></script>
<script>
if(window.Kubo2) {
  Kubo2.linkStyle('djpw-purified');
  Kubo2.linkScript('foo');
}
</script>
```

While `djpw-purified.css` and `foo.js` are simplified filenames of the extensions in this repository.
