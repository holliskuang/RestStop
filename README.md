# RestStop <img src='https://res.cloudinary.com/dd97ovnmi/image/upload/v1677132021/sleep_tryccy.png' width=40px height=40px style="margin-left:5px"> 

<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img style='border:1px solid black' src="https://res.cloudinary.com/dd97ovnmi/image/upload/v1677133721/electron_nTCA3KEQ5s_podo5y.gif" >
 
</div>





<!-- ABOUT THE PROJECT -->
## About The Project

<p>An Open source API development application. Send out requests, test your API endpoints and quickly receive the responses you want without the bloat. </p>
<p>
The application currently supports different methods such as: </p>
<ul>
  <li><strong style="color:red ">HTTP</strong></li>
  <li><strong style="color:blue ">GraphQL</strong></li>
  <li><strong style="color:green ">WebSocket</strong></li>
  <li><strong style="color:orange ">Server-Sent Events</strong></li>
  <li><strong style="color:indigo ">gRPC</strong></li>
</ul>

Work In Progress 🚧: 
<ul><li><strong>WebHook</strong></li></ul>

## Features

⭐ Minimalistic: Avoid the bloat that comes with Postman

💨 Real-Time: Send and Receive messages without delay

📚 DataBase: Automatically save and organize your requests/responses with the Folders System

✏️ Tests : Test your HTTP calls with assertions

## Supported Methods

**🔥HTTP**


- `GET` - Requests a representation of the specified resource
- `POST` - Sends data to the server
- `PUT` -  Creates a new resource or replaces a representation of the target resource with the request payload
- `PATCH` - Applies partial modifications to a resource
- `DELETE` - Deletes the specified resource.

**🕸️GraphQL**

RestStop supports all root operation types of GraphQL

- `QUERY` - Request data from server, similar to `GET`
- `MUTATION` - Modify server-side data. An all-in-one `POST`,`PUT`, `PATCH`, and `DELETE` 
- `SUBSCRIPTION` - Utilize WebSockets to maintain active listening connection to Server

**🔌WebSocket**

Connect and Establish Bi-Directional communcation channels with WebSocket Servers.

**📩Server-Sent Events**

Establish an HTTP connection to receive automatic updates from a server

**🔛gRPC**

RestStop supports all four kinds of service method. Upload a proto file to perform Remote Procedure Calls.
- `Unary` - Sends a request and gets a response
- `Client Stream` - Write a sequence of messages to the server and receive a response from the server
- `Server Stream` - Sends a request to the server and receive a sequence of messages back
- `Bidirectional Stream` - Server and Client both exchange messages to one another 





### Built With

* [![Electron][Electron.js]][Electron-url]
* [![TypeScript][TypeScript.js]][TypeScript-url]
* [![React][React.js]][React-url]
* [![Redux][Redux]][Redux-url]
* [![MUI][MUI]][MUI-url]
* [![Apollo-GraphQL][Apollo-GraphQL]][Apollo-GraphQL-url]





<!-- GETTING STARTED -->
## Getting Started



If you are interested in hosting your own version of this app, you will need to create an account with [Spotify For Developers](https://developer.spotify.com/) in order to access the necessary APIs that this app utilizes.


1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Fill in Client Secret Environment Variable with what you receive from your Spotify For Developers Account. This will provide you access to Spotify Web APIs

4. Replace the Redirect URI with your personal URL of choice to host the server




<!-- USAGE EXAMPLES -->
## Basic Documentation

There are 3 Sections of this Web App:
<ul><li>Top Tracks</li> <li>Top Artists</li> <li>Recently Played </li> </ul>

<p>For the Top Tracks and Top Artists section, you have the option to select a timeframe of 
<ul><li>All Time</li> <li>Most Recent 6 Months</li> <li>Most Recent Month</li> </ul></p>

<p>When you select your section and timeframe of interest, you will receive a list of your top songs/artists. For the Top Tracks section, you will receive your top 50 tracks of the selected timeframe. For the Top Artists section, you will receive a list of your top 50 artists. For the Recently Played section, you will receive your 50 most recent tracks that you have played.</p>

<p>Each of the items on the list you generate will link you to their respective Spotify page.</p>

<p> You can also create a playlist from your list of songs/artists which will create a playlist directly in your Spotify Account. No extra work required! Just name your playlist and it will show up on your Spotify App.</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add Top Artists Page
- [x] Add Top Tracks Page
- [x] Add Recently Played Page
- [x] Add Functionality to Create Playlist
- [ ] Get Approval for Autherntication Quota Extension

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).




<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request




<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.


<!-- CONTACT -->
## Contact

Hollis Kuang - kuanghollis@gmail.com

Project Link: [https://github.com/holliskuang/RestStop](https://github.com/holliskuang/RestStop)




<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Swell](https://github.com/open-source-labs/Swell)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[MUI]: https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white
[MUI-url]: https://mui.com/
[TypeScript.js]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Electron.js]: https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white
[Electron-url]: https://www.electronjs.org/
[Redux]: https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/
[Apollo-GraphQL]: https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql
[Apollo-GraphQL-url]: https://www.apollographql.com/
