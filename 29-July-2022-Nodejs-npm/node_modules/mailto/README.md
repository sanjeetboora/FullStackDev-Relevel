# mailto  [![Build Status](https://secure.travis-ci.org/oncletom/mailto.png?branch=master)](http://travis-ci.org/oncletom/mailto)

> Transform your HTML forms in beautiful `mailto:` links, form submission or XHR requests.

# What it does

![Demo as a GIF](https://raw.github.com/oncletom/mailto/master/demo.gif)

It basically uses your HTML forms, like this one:

```html
<fieldset>
  <legend>Talk Proposal</legend>

  <form method="POST" action="mailto:organisers@event.com">
    <label>
      Your name:
      <input type="text" name="username">
    </label>

    <label>
      Your email:
      <input type="email" name="from">
    </label>

    <label>
      Talk Title:
      <input type="text" name="title">
    </label>

    <label>
      Talk Format:
      <select name="format">
        <option></option>
        <option>Lightning Talk</option>
        <option>Keynote</option>
        <option>Workshop</option>
      </select>
    </label>

    <label>
      Talk Description:
      <textarea name="description"></textarea>
    </label>

    <input type="submit" value="Send Proposal">
  </form>
</fieldset>
```

And it helps you to outputs that for various needs, such as a nice and properly formatted text, ready to use:

> Dear organiser,
>
> I am **John Doe** and I propose you a topic entitled **Lightning Talk** entitled **Low-tech HTML forms without server component**.
>
> Here is what I have to say about it:
>
>> This is better than every social media marketing e-reputation blogware software in the cloud. Convinced? Are you a VC? Worth 20 millions, at least.
>
> You can address me an email at john@doe.co.uk or by replying to this email.

Also, you can generate a `mailto:` link to let any user send the content for the form in a nice way without any server side component.

# Install

<table>
  <thead>
    <tr>
      <th>npm</th>
      <th>bower</th>
      <th>old school</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>npm install --save mailto</code></td>
      <td><code>bower install --save mailto</code></td>
      <td><a href="https://github.com/oncletom/mailto/archive/master.zip">download zipfile</a></td>
    </tr>
  </tbody>
</table>

Then include it in your pages or bake it through your build system:

```html
<script src="https://rawgithub.com/oncletom/mailto/dist/mailto.min.js"></script>
<script>
// Vanilla JS
var m = new Mailto(…);

// Using RequireJS
require(['mailto'], function(mailto){
  var m = new Mailto(…);
});

// Using CommonJS module loader (browser and Node.js)
var mailto = require('mailto');
var m = new Mailto(…);
</script>
```

# Examples

## Simple posting with `mailto:`

```js
var m = new mailto('form[action^="mailto:"]', {
  onSubmit: mailto.sendForm
});
```
**Notice**: not yet implemented.


## Posting with `mailto:` and a custom layout

The `formatter` will help you to format the form values with your own logic.

```js
var templateSource = document.querySelector('#email-template').innerHTML;
var template = handlebars.compile(templateSource);

var m = new mailto('form[action^="mailto:"]', {
  formatter: function(m){
    return template(m.getData());
  }
});
```

## Posting with Ajax/XHR

```js
var m = new mailto('form[action^="mailto:"]', {
  onSubmit: function(m){
    $.post('/contact', { type: 'json' }, m.getData());
  }
});
```

## Preview as plain text before sending

```js
var form = document.querySelector('.mailto-form');
var m = new mailto(form);
var previewButton = form.querySelector('.preview-button');
var previewContainer = form.querySelector('+ .preview-container');

previewButton.addEventListener('click', function(){
  previewContainer.innerHTML = m.getBody();
  previewContainer.hidden = false;
  form.hidden = true;
});
```

## Update a fallback on form update

```js
var form = document.querySelector('.mailto-form');
var m = new mailto(form);
var emailLink = form.querySelector('.email-link-fallback');

form.addEventListener('change', function(){
  emailLink.href = m.getmailtoUrl();
});
```

# JavaScript Options

All options are optional and set up with usable defaults. Change them accordingly to your needs.

## `preventDefault`

`Boolean` indicating if `mailto` should prevent the form to be submitted.

Default value is `true`.


```js
// the form `submit` event will be fired, whatever `mailto` does.
var m = new mailto('.mailto-form', { preventDefault: false });
```

## `formatter`

`Function` used to generate a human readable representation of the form. It is used by `mailto.getBody()`.

Its first and only argument is the actual `mailto` instance bound to the form.

```js
// the form `submit` event will be fired, whatever `mailto` does.
var m = new mailto('.mailto-form', {
  formatter: return jsonEncoder(m){
    return JSON.stringify(m.getData());
  }
});
```

## `onSubmit`

`Function` used when the HTML triggers a `submit` event. This is the best way to hook custom processing.

Its first and only argument is the actual `mailto` instance bound to the form.

```js
// the form `submit` event will be fired, whatever `mailto` does.
var m = new mailto('.mailto-form', {
  onSubmit: return submitDebugger(m){
    console.log(m.getMailtoLink);
  }
});
```

# JavaScript API

## `new mailto(form[, options])`

Returns a new `mailto` instance configured with the options described above.

```js
var m = new mailto('.mailto-form');

// play and use any of the other documented API methods
```

## `getData()`

Returns a serialised representation of the form values as a key/value object. Suitable for XHR requests.

```js
var m = new mailto('.mailto-form');

m.getData();
// -> { from: 'John Doe', message: 'Can I has cheesburger?' }
```

## `getBody()`

Returns a human readable formatted form content.

By changing the `formatter` option, you can alter the output of this function.

```js
var m = new mailto('.mailto-form');

m.getBody();
// -> Name: John Doe
// -> Message: Can I has cheeseburger?
```

## `getFormData()`

Returns an expanded array of form values, included labels and field names.

```js
var m = new mailto('.mailto-form');

m.getFormData();
// -> [
// ->   { name: 'from', value: 'John Doe', label: 'Name' },
// ->   { name: 'message', value: 'Can I has cheesburger?', label: 'Message' },
// -> ]
```

## `getMailtoUrl([to, [fields]])`

Returns an URL encoded string suitable for a clickable `a[href]` or `form[target]` attribute.

```js
var m = new mailto('.mailto-form');

m.getMailtoUrl();
// -> mailto:test@example.com?body:<URL Encoded Message Body>

m.getMailtoUrl('someone@else.com');
// -> mailto:someone@else.com?body:<URL Encoded Message Body>
```


# Contributing

One rule only: *respect the code*. For the rest, bring your ideas, raise issues and push code :-)

# License

> The MIT License (MIT)
>
> Copyright (c) 2013, Thomas Parisot
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
