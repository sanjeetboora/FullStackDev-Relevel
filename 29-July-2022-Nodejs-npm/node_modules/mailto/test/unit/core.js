'use strict';

var Mailto = require('../../index.js');
var expect = require('chai').expect;
var fixtures;

function createFixtures(){
  fixtures = document.createElement('div');
  fixtures.id = 'fixtures';

  Object.keys(window.__html__).forEach(function(location){
    location.match(/(\w+).html$/);

    var el = document.createElement('div');
    el.id = 'fixtures-'+RegExp.$1;
    el.innerHTML = window.__html__[location];

    fixtures.appendChild(el);
  });

  document.body.appendChild(fixtures);
}

function clearFixtures(){
  document.body.removeChild(fixtures);
}

function getNamedValues(data, namedValue){
  return data.filter(function(d){
    return d.name === namedValue;
  });
}

describe('Mailto Constructor', function(){
  beforeEach(createFixtures);
  afterEach(clearFixtures);

  it('should accept a valid CSS selector string', function(){
    expect(new Mailto('.mailto-form')).to.be.an.instanceof(Mailto);
    expect(function(){ new Mailto('body'); }).to.throw();
    expect(function(){ new Mailto('.idontexist'); }).to.throw();
  });

  it('should accept a DOM element form', function(){
    expect(new Mailto(document.querySelector('.mailto-form'))).to.be.an.instanceof(Mailto);
    expect(function(){ new Mailto(document.querySelector('body')); }).to.throw();
    expect(function(){ new Mailto(document.querySelector('.idontexist')); }).to.throw();
  });

  it('should accept documented options only', function(){
    var form = document.querySelector('.mailto-form');
    var m = new Mailto(form);

    // default options
    expect(m.preventDefault).to.be.true;
    expect(m.onSubmit).to.be.a('function');
    expect(m.formatter).to.be.a('function');


    // deactivated preventDefault
    expect(new Mailto(form, { preventDefault: false }).preventDefault).to.be.false;

    // onSubmit
    expect(new Mailto(form, { onSubmit: function(){ return 'hey'; } })).to.satisfy(function(m){ return m.onSubmit() === 'hey'; });
    expect(new Mailto(form, { onSubmit: '' }).onSubmit).to.be.a('function');

    // formatter
    expect(new Mailto(form, { formatter: function(data){ return 'hey'+data; } })).to.satisfy(function(m){ return m.formatter('hey') === 'heyhey'; });
    expect(new Mailto(form, { formatter: '' }).formatter).to.be.a('function');
  });
});

describe('Mailto.getFormData()', function(){
  beforeEach(createFixtures);
  afterEach(clearFixtures);

  it('should collect default form data', function(){
    var m = new Mailto('#fixtures-default .mailto-form');

    expect(m.getFormData()).to.have.lengthOf(3);
    expect(m.getFormData()[0]).to.deep.equal({ name: 'from', label: 'User Email', value: '' });
    expect(m.getFormData()[1]).to.deep.equal({ name: 'subject', label: '', value: 'Default value' });
    expect(m.getFormData()[2]).to.deep.equal({ name: 'message', label: 'Message Content:', value: '' });
  });

  it('should collect the single value of an `input[type=radio]`', function(){
    var m = new Mailto('#fixtures-smoke .mailto-form');
    var genders = {
      male: { name: 'gender', label: 'Male', value: 'male' },
      optout: { name: 'gender', label: 'Prefer not to say', value: 'optout' }
    };

    // checked element
    expect(getNamedValues(m.getFormData(), 'gender')).to.deep.equal([genders.male]);

    m.form.querySelector('#gender-optout').checked = true;
    m.form.querySelector('#gender-male').checked = false;   // PhantomJS bug
    expect(getNamedValues(m.getFormData(), 'gender')).to.deep.equal([genders.optout]);

    // unchecked element first
    expect(m.getFormData()).to.be.length.of(6);

    m.form.querySelector('#tos-no').checked = true;
    expect(getNamedValues(m.getFormData(), 'tos')).to.deep.equal([{ name: 'tos', label: 'No, let\'s be friends', value: 'no' }]);

  });

  it('should collect the multiple values of an `input[type=checkbox]`', function(){
    var m = new Mailto('#fixtures-smoke .mailto-form');

    expect(m.getFormData()[2]).to.deep.equal({ name: 'format', label: 'Lightning Talk', value: 'lt' });

    m.form.querySelector('#format-keynote').checked = true;

    expect(m.getFormData()[2]).to.deep.equal({ name: 'format', label: 'Keynote', value: 'keynote' });
    expect(m.getFormData()[3]).to.deep.equal({ name: 'format', label: 'Lightning Talk', value: 'lt' });
  });

  it('should collect relevant value of a `select`', function(){
    var m = new Mailto('#fixtures-smoke .mailto-form');

    expect(m.getFormData()[3]).to.deep.equal({ name: 'country', label: 'Current country of residence', value: '' });

    m.form.querySelector('[name="country"]').selectedIndex = 2;

    expect(m.getFormData()[3]).to.deep.equal({ name: 'country', label: 'Current country of residence', value: 'fr' });
  });
});

describe('Mailto.getData()', function(){
  beforeEach(createFixtures);
  afterEach(clearFixtures);

  it('should collect default form data', function(){
    var m = new Mailto('#fixtures-default .mailto-form');

    expect(m.getData()).to.deep.equal({ from: '', subject: 'Default value', message: '' });
  });

  it('should aggregate values together', function(){
    var m = new Mailto('#fixtures-smoke .mailto-form');

    // thought DOM was unchecking radio but no…
    m.form.querySelector('#gender-female').checked = true;
    m.form.querySelector('#gender-male').checked = false;

    m.form.querySelector('#format-keynote').checked = true;
    m.form.querySelector('#tos-yes').checked = true;

    expect(m.getData()).to.deep.equal({
      from: '',
      gender: 'female',
      format: ['keynote', 'lt'],
      country: '',
      subject: 'Default value',
      message: '',
      tos: 'yes'
    });
  });
});

describe('Mailto.getBody()', function(){
  beforeEach(createFixtures);
  afterEach(clearFixtures);

  it('should return a default body', function(){
    var m = new Mailto('#fixtures-default .mailto-form');
    var expectedOutput = document.querySelector('#fixtures-default .expected-output');

    expect(m.getBody()).to.eq(Mailto.textContent(expectedOutput).trim());
  });

  it('should return a custom formatted body', function(){
    var expectedOutput = document.querySelector('#fixtures-smoke .expected-output');
    var m = new Mailto('#fixtures-smoke .mailto-form', {
      formatter: function(m){
        var data = m.getData();

        return Mailto.textContent(document.querySelector('#fixtures-smoke .content-template')).trim().replace(/{{(\w+)}}/g, function(m, key){
          return data[key] && data[key].toString();
        });
      }
    });

    m.form.querySelector('#gender-female').checked = true;
    m.form.querySelector('#gender-male').checked = false;
    m.form.querySelector('[name="from"]').value = 'jane@doe.co.uk';
    m.form.querySelector('#format-keynote').checked = true;
    m.form.querySelector('[name="country"]').selectedIndex = 1;
    m.form.querySelector('[name="subject"]').value = 'Men come from Venus, really';
    m.form.querySelector('[name="message"]').value = 'Have some viagra for you people.';

    expect(m.getBody()).to.eq(Mailto.textContent(expectedOutput).trim());
  });
});

describe('Mailto.getMailtoUrl()', function(){
  beforeEach(createFixtures);
  afterEach(clearFixtures);

  it('should return a default body', function(){
    var m = new Mailto('#fixtures-default .mailto-form');

    expect(m.getMailtoUrl()).to.eq('mailto:test@example.com?subject=&body=User%20Email%3A%0D%0Asubject%3A%20Default%20value%0D%0AMessage%20Content%3A%0D%0A');
    expect(m.getMailtoUrl('chuck@norr.is')).to.eq('mailto:chuck@norr.is?subject=&body=User%20Email%3A%0D%0Asubject%3A%20Default%20value%0D%0AMessage%20Content%3A%0D%0A');
    expect(m.getMailtoUrl('chuck@norr.is', { subject: 'Hello', body: 'World' })).to.eq('mailto:chuck@norr.is?subject=Hello&body=World%0D%0A');
  });

  it('should grab a subject form `data-*` or `input[type=hidden][name=subject]`', function(){
    var m = new Mailto('#fixtures-smoke .mailto-form');

    expect(m.getMailtoUrl()).to.match(/mailto:test@example\.com\?subject=Grabbed%20from%20data-uri&/);
  });
});