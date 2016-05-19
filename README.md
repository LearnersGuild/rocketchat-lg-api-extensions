# learnersguild:rocketchat-lg-api-extensions

Custom API extensions for Rocket.Chat within Learners Guild.

**NOTE:** This package will likely not be useful for anyone outside of [Learners Guild][learnersguild].

## Getting Started (Dev)

Be sure you've read the [instructions for contributing](./CONTRIBUTING.md).

1. Get your local [IDM][IDM] up and running.

2. Get your local [Rocket.Chat][Rocket.Chat] up and running.

3. Clone this repository.

4. From your local Rocket.Chat repository's `packages` folder, add a symlink to this repo, then add the package:

        $ ln -s ../rocketchat-lg-slash-commands .
        $ meteor add learnersguild:rocketchat-lg-slash-commands

6. Start the server.

        $ learners-guild/start.sh

7. Visit the server in your browser:

        $ open http://chat.learnersguild.dev


## License

See the [LICENSE](./LICENSE) file.


[IDM]: https://github.com/LearnersGuild/idm
[Rocket.Chat]: https://github.com/LearnersGuild/Rocket.Chat
[learnersguild]: https://www.learnersguild.org/
