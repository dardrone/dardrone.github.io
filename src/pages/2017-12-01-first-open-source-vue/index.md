---
title: Open Sourcing My First Vue Component
date: "2017-12-01T17:36:55.338Z"
path: "/open-sourcing-my-first-vue-component/"

---
> **tl;dr** I'm open sourced vue-autosuggest, and wrote about it. Check out the <a href="https://medium.com/@darrenjennings/open-sourcing-your-first-vue-component-5ef015e1f66c" target="_blank">medium post</a> and the <a href="https://www.github.com/Educents/vue-autosuggest" target="_blank">source code.</a>

<img style="margin-bottom:0;" src="./vueautosuggest_educents.gif" class="shadow" alt="vue-autosuggest on Educents."/>

<p style="text-align: center;">
<em style="font-size:0.75em; margin-bottom:1.45rem;">Vue-autosuggest in the wild on <a href="https://www.educents.com/" target="_blank">Educents.com</a></em>
</p>

In case you’re new to [Vue](https://vuejs.org), it’s an awesome javascript front-end framework that makes writing reusable, testable UI components a breeze! I [recently wrote](https://medium.com/@darrenjennings/data-driven-vue-js-53e84f16e28f) about how I love Vue’s data-driven design and second-to-none documentation. However, I wanted to write about my experience with open sourcing my first Vue component in the spirit of [Hacktoberfest](https://hacktoberfest.digitalocean.com/stats/darrenjennings). Here’s what I found helpful traversing the mire.

## Before you begin, pick a component you already need!
It’s always a good idea to contribute to Open Source Software [#OSS](https://twitter.com/search?q=%23OSS) by solving a problem that you already have. As [Max Stoiber says](https://medium.com/r/?url=https%3A%2F%2Fmxstbr.blog%2F2017%2F02%2Fcreating-open-source-projects%2F), open source is a byproduct of solving problems. If you’re already building reusable components, why not make them available for everyone and learn some things in the process? If your components seem too tightly coupled to your application structure, maybe it’s time to ask “What do I need to do to open source this?” At Educents, we built an autosuggest component that would be flexible enough to eventually abstract for general use cases while still solving our real problems… and then we open-sourced it!

## Grab a Template
Look at existing Vue projects for suggested structures for your github project. Here are some mature projects we used as templates when writing a plugin:
- For plugins in the wild, checkout Algolia’s instant search component or Freek Van der Herten/Spatie’s vue table component
- For testing help check out [vue-test-utils-jest-example](https://github.com/vuejs/vue-test-utils-jest-example)
- For general OSS project scaffolding, look at Kent C. Dodds’ [kcd-scripts](https://github.com/kentcdodds/kcd-scripts)

Of course you should also read the official docs for an overview on how plugins in Vue work.
If you’re already segmenting your UI library into prop-driven components, then open sourcing a component isn’t much more than a simple index.js script with an `install()` method.

Here is an example from a fictitious plugin called VueToAKill.
```js
import VueToAKill from "./VueToAKill.vue";

const VueToAKillLib = {
  install(Vue) {
    Vue.component("vue-to-a-kill", VueToAKill);
  }
};

export default VueToAKillLib;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(VueToAKillLib);
}
```

## Build Your Vue Component for the masses

You need to get your component into a single consumable file. Webpack, rollup, something else? Not much to say here except that I was familiar with Webpack so I went that direction. It’s worth noting that Rollup seems to be more popular as the Vue and React teams both use it to bundle their main libraries.

Webpack example partial config (full example config):
```
output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    library: "VueToAKill",
    libraryTarget: "umd" // you can build for commonjs also
},
```

Naming the libary e.g. VueToAKill will give you the ability to reference the library outside of a build tool, such as JSFiddle, or you can autoload the plugin for users inside your install load (as demonstrated in index.js Gist code block on lines 11–13 above). If you include it in a script tag, you can simple load it into your Vue app like this:

```js
Vue.use(window.VueToAKill.default);
```

Once your lib is on npm, loading the plugin as a module in your build tools (such as webpack), is as simple as installing and importing:

```js
import VueToAKill from 'vue-to-a-kill'; 
Vue.use(VueToAKill);
```

## Test Your Vue Component
Vue testing has a great library, vue-test-utils (recently migrated from the popular lib avioraz), and it is being actively developed. While still in beta at the time of this article, we found it worked well and gives you a testing tool belt akin to Enzyme (for React ❤️), and can be easily integrated into existing testing tools such as Jest or Mocha. It has shallow mounting of components, and server side rendered snapshots for 📸 snapshot testing. We even filed an issue we discovered while testing and the maintainer responded within a few hours with a commit fixing the issue.

Check out an example test on our VueToAKill component. I’m rendering the component, and checking that the agents prop I’m passing is rendered in the result Vue html with the desired number of `<li>` tags.

```js
import { shallow } from "vue-test-utils";
import { createRenderer } from "vue-server-renderer";

import VueToAKill from "../src/VueToAKill.vue";

const defaultProps = {
  agents: ['James Bond', 'Alec Trevelyan', 'M', 'Q'],
  licenseToKill: true
};

it("can mount", () => {
  const props = Object.assign({}, defaultProps);
  props.licenseToKill = false;

  const wrapper = shallow(VueToAKill, {
    propsData: props
  });

  expect(wrapper.findAll(`ul li`).length).toBeLessThanOrEqual(
      props.agents.length
  );
  
  const renderer = createRenderer();
  renderer.renderToString(wrapper.vm, (err, str) => {
    if (err) throw new Error(err);
    expect(str).toMatchSnapshot();
  });
});
```

Try to aim for 100% coverage on vue component libraries since it is far easier to obtain when writing smaller components and it gives your users confidence beyond the stars and the retweets. I’ll eat my own words though and tell you, full coverage is a shibboleth of OSS, and promises little to the stability of a project.

Getting full coverage shouldn’t be your goal, but more of a ‘nice to have’. Test your code, for the reason that when the PR’s roll in, you can manage changes more easily. Testing should help you make changes faster.

## Add Your Docs + Demo 📖
Once you publish your package to npm, you can make it easier on your users by giving them a playground to test it out. There are some great REPL’s out there for playing with javascript such as jsfiddle, codesandbox.io, codepen, or jsbin.com. The trick with using these editors is allowing your library to be consumable from a `<script>` tag. Albeit, codesandbox has the advantage of using a module loading via webpack so it’s more like a real-life app. You can utilize npm package publishing sites such as the <a href="https://unpkg.com">unpkg.com</a> CDN which will serve up any npm package. In jsfiddle, you can add your unpkg url to the list of resources.

<iframe width="100%" height="400" src="//jsfiddle.net/darrenjennings/dugbvezs/embedded/" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Also, go check out Storybook, which gives you a framework for building live coding demos of all the iterations of your component. This gives your api an easy playground for users to click through, and you can quickly see your component in complex/different mutations. You can also debug components in storybook, build it as a static site, and deploy it on your github.io page 💯. It’s the future, yo.

## Make it fancy 💅🏻
Make it fancy, a.k.a. user-friendly. Your README.md is your landing page. Give it a little love so that users have a good experience! Your readme should have docs that are understandable, and clean. Think about a first time user who doesn’t know exactly how to use or install Vue plugins.
- Explain WHAT problem the plugin is solving and WHY it stands apart.
- Create templates for what users/contributors see when they create [github issues](https://github.com/Educents/vue-autosuggest/blob/master/.github/ISSUE_TEMPLATE.md) or [pull requests](https://github.com/Educents/vue-autosuggest/blob/master/.github/PULL_REQUEST_TEMPLATE.md) by creating a ISSUE_TEMPLATE.md and a PULL_REQUEST_TEMPLATE.md in a .github folder in the root of your repo.
- Add [badges](https://egghead.io/lessons/javascript-how-to-write-a-javascript-library-adding-badges-to-your-readme)!
- Incorporate [Continuous integration](https://egghead.io/lessons/javascript-how-to-write-a-javascript-library-adding-badges-to-your-readme) like TravisCI

If you’re proud of your code, spend the extra time to help others be excited to use it.

## 🚀 Publish to npm
`npm publish` it! At Educents, we actively developed our autosuggest plugin in beta, consuming and refining it for our own use case, until we felt it was ready for the world to be released for our public 1.0 release. So don’t wait to publish, just give your README.md a big ⚠️ warning label if it’s under active development, and make sure your version is in beta e.g. v0.0.1-beta.1

## Share it
Write a [Medium](https://medium.com/@darrenjennings/open-sourcing-your-first-vue-component-5ef015e1f66c) article, tweet about it, submit a PR to awesome-vue, share it with [Sarah Drasner](https://www.twitter.com/sarah_edo) 😜. Why plug your own stuff? Mainly because the more people that use your code, the better it becomes. Or at least that’s the idea 😂 If you have a cool component, tweet at me and I’d love to check it out.

## Conclusions
What makes React so much fun is its popularity and inspiration in an ever growing evolution of open source software. Vuejs is doing the same thing! It’s proving to be a fun and testable framework for composing these reusable building blocks. My hope is that you architect great things, no matter language or framework you’re in.

If you enjoyed reading this, follow me on twitter where my DM’s are always open… and of course go checkout [vue-autosuggest](https://github.com/Educents/vue-autosuggest), and give it some ⭐️’s if you like it!

Helpful links:
- https://alexjoverm.github.io/2017/08/21/Write-the-first-Vue-js-Component-Unit-Test-in-Jest/
- https://www.manning.com/books/testing-vuejs-applications
- https://eddyerburgh.me/unit-test-vue-components-beginners


