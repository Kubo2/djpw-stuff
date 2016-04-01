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

# Character encoding of extension files

While DJPW uses the `iso-8859-2` in the web interface, you're strongly encouraged to make all extensions in the Unicode's `UTF-8` encoding. This covers generally all characters you will be ever using, so it's a pretty good choice for you. Moreover, the `Kubo2.loadScript()` method has got `UTF-8` hardcoded in it when setting the `charset` attribute on the `<script>` tag, thus unless you're going to write your own `loadScript()` handler, use `UTF-8` for your JavaScript extension.

You are strongly encouraged to use `UTF-8` for your CSS extensions as well, though you can set the correct encoding using the `@charset` at-rule in your stylesheet.
