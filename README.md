# CurrencyConverter

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.4.

Due to Angular v20 naming conventions encourage to omit type suffixes in file names like "component", "service", "pipe", "directive"
I decided to go with latest Angular designers decisions.
If team would like to restore previous versions default behaviour, there is property option "type" which can be added to schematics in angular.json
for ex.

```json
"@schematics/angular:service": {
  "type": "service"
}
```

I also added OnPush as default strategy

Environments both the same, normally for development and prod would be different urls

# What I would change in my solution but didn't had time?
I would move select and input to component and make component ControlValueAccessor with config as input to set 'amountTo' input as readonly
If solution would work in both ways exactly like on google, then input and select in one component reused one after another.
There are few 'any' type here and there, also because lack of time


## Development server

First install packages:
```bash
npm install
```

To start a local development server, run:

```bash
ng serve
```




