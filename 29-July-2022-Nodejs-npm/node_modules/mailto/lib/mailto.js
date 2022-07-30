'use strict';

/**
 * Mailto Constructor.
 *
 * @param {HTMLElement|String} form
 * @param {Object=} options
 * @constructor
 */
function Mailto(form, options){
  /**
   *
   * @type {HTMLElement}
   */
  this.form = null;

  /**
   *
   * @type {boolean}
   */
  this.preventDefault = true;

  /**
   *
   * @type {Function}
   */
  this.formatter = Mailto.defaultFormatter;

  /**
   *
   * @type {Function}
   */
  this.onSubmit = function(m){};

  this.initFormObject(form);
  this.initOptions(options);
  this.initFormHandler();
}

/**
 * @prototype
 */
Mailto.prototype = {
  initFormObject: function initFormObject(formOrSelector){
    if (typeof formOrSelector === 'string'){
      this.form = document.querySelector(formOrSelector);
    }
    else{
      this.form = formOrSelector;
    }

    if (!this.form || !('nodeName' in this.form) || this.form.nodeName !== 'FORM'){
      throw new Error('Mailto first argument should be a valid CSS selector or a form instance.');
    }
  },

  initOptions: function initOptions(options){
    options = options || {};

    if (options.hasOwnProperty('preventDefault')){
      this.preventDefault = !!options.preventDefault;
    }

    if (typeof options.onSubmit === 'function'){
      this.onSubmit = options.onSubmit;
    }

    if (typeof options.formatter === 'function'){
      this.formatter = options.formatter;
    }
  },

  initFormHandler: function initFormHandler(){
    var self = this;

    this.form.addEventListener('submit', function(event){
      if (self.preventDefault){
        event.preventDefault();
      }

      self.onSubmit(self);
    });
  },

  /**
   * Returns a formatted form values body.
   *
   * Perfect to show to humans or send as mail content etc.
   *
   * @api
   * @returns {String}
   */
  getBody: function getBody(){
    return this.formatter(this);
  },

  /**
   * Returns an hyperlinkable representation of the form values.
   *
   * @api
   * @return {String}
   */
  getMailtoUrl: function getMailtoUrl(to, fields){
    this.form.action.match(/mailto:([^\?&]+)/);

    to = to || RegExp.$1 || '';
    fields = fields || {
      subject: this.form.getAttribute('data-subject') || '',
      body: this.getBody()
    };

    if (!to && !fields.to){
      throw new Error('Could not find any person to send an email to.');
    }

    return 'mailto:'+to+'?'+Object.keys(fields).reduce(function(a, b, i){
      return a +
        (i > 0 ? '&' : '') +
        encodeURIComponent(b) + '=' +
        encodeURIComponent(fields[b]).replace(/%0A(?!%)/g, '%0D%0A') +    // fixing *nix line break encoding to follow RFC spec
        (b === 'body' ? '%0D%0A' : '')
    }, '');
  },

  /**
   * Returns the filtered values of a form.
   *
   * They are basically:
   * - for named options
   * - one entry per input/checked/selected option (even if they have the same name)
   *
   * @api
   * @returns {Array.<{name: String, label: String, value: String|Boolean|Number}>}
   */
  getFormData: function getFormData(){
    var form = this.form;
    var selector = ['input', 'select', 'textarea'].join(',');

    return [].slice.call(form.querySelectorAll(selector))
      .filter(Mailto.formDataFilter)
      .map(Mailto.formDataMapper(form));
  },

  /**
   * Returns an aggregated object of form values.
   *
   * If form fields has the same name, their value will be aggregated as an array for this given name.
   *
   * @api
   * @returns {Object}
   */
  getData: function getData(){
    var data = {};

    this.getFormData().forEach(function(d){
      if (Array.isArray(data[d.name])){
        data[d.name].push(d.value);
      }
      else if (data[d.name] !== undefined){
        data[d.name] = [data[d.name], d.value];
      }
      else {
        data[d.name] = d.value;
      }
    });

    return data;
  }
};

Mailto.formDataFilter = function formDataFilter(el){
  if (!el.name){
    return false;
  }

  if ((el.type === 'checkbox' || el.type === 'radio') && el.checked === false){
    return false;
  }

  return true;
};

Mailto.formDataMapper = function formDataMapper(form){
  return function (el){
    var value = el.value;
    var label = el.title;

    if ('selectedIndex' in el) {
      value = el.options[el.selectedIndex].getAttribute('value');
    }

    if (el.id){
      var source = form.querySelector('label[for="'+el.id+'"]');

      if (source) {
        label = Mailto.textContent(source);
      }
    }

    if (!label && el.parentNode.nodeName === 'LABEL') {
      label = Mailto.textContent(el.parentNode);
    }

    return {
      name: el.name,
      label: label === null ? '' : label,
      value: value === null ? '' : value
    };
  }
};

Mailto.defaultFormatter = function(m){
  return m.getFormData().map(function(d){
    return (d.label || d.name).replace(/:$/, '') + ':' + (d.value && ' ' + d.value);
  }).join("\n");
};

Mailto.textContent = 'textContent' in document ?
  function getTextContent(el){ return el.textContent.trim(); } :
  ('innerText' in document ?
    function getInnerText(el){ return el.innerText.trim(); } :
    function getContent(el){ return elinnerHTML.replace(/\&lt;br\&gt;/gi,"\n").replace(/(&lt;([^&gt;]+)&gt;)/gi, '').replace(/(^\s+|\s+$)/g, ''); }
  )

module.exports = Mailto;