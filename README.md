### How to compile & load

```sh
$ git clone git://github.com/jayluxferro/reflutter-frida-agent.git
$ cd reflutter-frida-agent/
$ npm install
$ frida -U -f com.example.android --no-pause -l _agent.js
```

### Development workflow

To continuously recompile on change, keep this running in a terminal:

```sh
$ npm run watch
```

And use an editor like Visual Studio Code for code completion and instant
type-checking feedback.
