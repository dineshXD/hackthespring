// import { StreamChat } from "stream-chat";
// import {
//   Chat,
//   Channel,
//   ChannelHeader,
//   MessageInput,
//   MessageList,
//   Thread,
//   Window,
// } from "stream-chat-react";

// import "stream-chat-react/dist/css/v2/index.css";

// const PatientChat = () => {
//   const userId = "cold-rain-1";
//   const userName = "cold-rain-1";
//   const anotherUser = "cold-rain-2";
//   const anotherUsername = "cold-rain-2";
//   const user = {
//     id: userId,
//     name: userName,
//     image: `https://getstream.io/random_png/?id=${userId}&name=${userName}`,
//   };
//   const user2 = {
//     id: anotherUser,
//     name: anotherUsername,
//   };

//   const apiKey = "qy2ngvh8byqb";
// await client.connectUser﻿(
//     {
//         id: 'jlahey'﻿,
//         name: 'Jim Lahey'﻿,
//         image: 'https://i.imgur.com/fR9Jz14.png'﻿,
//     }﻿,
//    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY29sZC1yYWluLTEifQ.ngh5Z5QJ3CVRVikOpU_KzbH8KvlesILO4wktVXjcQWM",

//   const chatClient = new StreamChat(apiKey);
//   chatClient.connectUser(user, userToken);
//   const channel = chatClient.channel("messaging", {
//     members: ["vishal", "neil"],
//     name: "Awesome channel about traveling",
//   });
//   return (
//     <Chat client={chatClient} theme="str-chat__theme-light">
//       <Channel channel={channel}>
//         <Window>
//           <ChannelHeader />
//           <MessageList />
//           <MessageInput />
//         </Window>
//         <Thread />
//       </Channel>
//     </Chat>
//   );
// };
// export default PatientChat;
