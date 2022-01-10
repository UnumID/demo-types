# UnumID Demo Types

This project contains all of our shared, generic Typescript types that are used through out the [UnumID](https://https://docs.unum.id/) Demo ecosystem. 

## Release
Releases are handled programmatically via Github Actions CI. Simply push a tag with a preceding 'v' followed by the semver version of the release, i.e. v3.4.3. The CI job will then handle updating the package version, creating new typedocs, creating a Github release, and publishing the package to NPM and Github Packages.