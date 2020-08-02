# Government budget visualisation

<TODO netlify badge>

## Dev setup
This site is managed by [Hugo](https://gohugo.io/). To setup your dev environment:
* Install hugo, see https://gohugo.io/getting-started/installing
* Clone this repository: `git clone https://github.com/raphaelmerx/govbudget`
* `cd govbudget`
* Init submodules: `git submodule update --init --recursive`
* Run the hugo development server: `hugo server -D`
* You can now access this site at http://localhost:1313/
* Try changing for example `content/tdt/home/cases.md`,  it will update in your browser


## Deployment
Deployment is managed by Netlify: <TODO netlify link>
Every time you `git push` a new commit to master, Netlify will deploy automatically by:

* Running the `hugo` command to generate all the site files in the `public` directory
* Publishing the site to https://focused-haibt-731db7.netlify.app/

## Architecture
This site uses a fork of [the Hugo Academic theme](https://github.com/covid19-tl/hugo-academic).
