# Biophysics - Breadcrumbs

TODO:

## What is Breadcrumbs?

Education stands as a pivotal force in socioeconomic mobility.
Yet, generational barriers outside of an individual's influence hinder a person's access to educational opportunities.
Breadcrumbs represents [OASCI's](https://www.oasci.org/) initiative to fundamentally transform access to educational materials, embodying the spirit of discovery and the sharing of knowledge fragments that have traditionally been accessible only through the goodwill of others.
Breadcrumb websites are freely accessible resources, and we encourage contributions, improvements, and adaptations so long as they abide by the terms outlined in the [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) license.

## Deploying

We use [bump-my-version](https://github.com/callowayproject/bump-my-version) to release a new version.
This will create a git tag that is used by [poetry-dynamic-version](https://github.com/mtkennerly/poetry-dynamic-versioning) to generate version strings.

However, we are using [Calendar Versioning](https://calver.org/), meaning we need to specify new versions manually.
For example, to bump the version to November 8, 2024, you would run the following command after activating the relevant conda environment.

```bash
bump-my-version bump --new-version 2024.11.8
```

After releasing a new version, you must push and include all tags.

```bash
git push --follow-tags
```

## License

Code contained in this project is released under the [MIT License](https://spdx.org/licenses/MIT.html) as specified in [`LICENSE_CODE`](https://github.com/oasci-bc/biophys/blob/main/LICENSE_CODE.md).
This license grants you the freedom to use, modify, and distribute it as long as you include the original copyright notice contained in [`LICENSE_CODE`](https://github.com/oasci-bc/biophys/blob/main/LICENSE_CODE.md) and the following notice.

> Portions of this code were incorporated with permission from [CADD Breadcrumbs](https://github.com/oasci-bc/biophys) by OASCI licensed under the [MIT license](https://github.com/oasci-bc/biophys/blob/main/LICENSE_CODE.md).

All other data, information, documentation, and associated content provided within this project are released under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/) as specified in [`LICENSE_INFO`](https://github.com/oasci-bc/biophys/blob/main/LICENSE_INFO.md).

> Some content was incorporated with permission from [CADD Breadcrumbs](https://github.com/oasci-bc/biophys) by OASCI licensed under the [CC BY-NC-SA 4.0 license](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## Web analytics

Why would we want to track website traffic?

An instructor can gain insights into how students engage with online teaching materials by analyzing web analytics.
This information is instrumental in assessing the effectiveness of the materials.
Web analytics reveal the popularity of specific topics or sections among students, empowering instructors to tailor future lectures or discussions.
Analytics also provides valuable data for curriculum development, helping instructors identify trends, strengths, and weaknesses in course materials.
Additionally, instructors may leverage web analytics as evidence of their commitment to continuous improvement in teaching methods, which is helpful in discussions related to professional development, promotions, or tenure.

We track website traffic using [plausible][plausible], which is privacy-friendly, uses no cookies, and is compliant with [GDPR][gdpr], [CCPA][ccpa], and [PECR][pecr].
We also share [this website's analytics with you][plausible-link] for additional transparency.

[plausible]: https://plausible.io
[plausible-link]: https://plausible.io/biophys.crumblearn.org/
[gdpr]: https://gdpr-info.eu/
[ccpa]: https://oag.ca.gov/privacy/ccpa
[pecr]: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/what-are-pecr/
