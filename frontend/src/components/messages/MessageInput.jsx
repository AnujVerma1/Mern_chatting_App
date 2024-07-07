import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null); // State to store selected file
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !file) return; // Require either message or file to be present

    // Call sendMessage with both message and file data
    await sendMessage({ message, file });
    setMessage(""); // Clear message input
    setFile(null); // Clear selected file
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <label className="absolute inset-y-0 end-12 flex items-center cursor-pointer">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
          Attach File
        </label>
        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
          {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
        </button>
        {file && (
          <p className="text-xs mt-2">{file.name}</p> // Display selected file name
        )}
      </div>
    </form>
  );
};

export default MessageInput;



































// import { useState } from "react";
// import { BsSend } from "react-icons/bs";
// import useSendMessage from "../../hooks/useSendMessage";

// const MessageInput = () => {
// 	const [message, setMessage] = useState("");
// 	const { loading, sendMessage } = useSendMessage();

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		if (!message) return;
// 		await sendMessage(message);
// 		setMessage("");
// 	};

// 	return (
// 		<form className='px-4 my-3' onSubmit={handleSubmit}>
// 			<div className='w-full relative'>
// 				<input
// 					type='text'
// 					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
// 					placeholder='Send a message'
// 					value={message}
// 					onChange={(e) => setMessage(e.target.value)}
// 				/>
// 				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
// 					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
// 				</button>
// 			</div>
// 		</form>
// 	);
// };
// export default MessageInput;

// // STARTER CODE SNIPPET
// // import { BsSend } from "react-icons/bs";

// // const MessageInput = () => {
// // 	return (
// // 		<form className='px-4 my-3'>
// // 			<div className='w-full'>
// // 				<input
// // 					type='text'
// // 					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
// // 					placeholder='Send a message'
// // 				/>
// // 				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
// // 					<BsSend />
// // 				</button>
// // 			</div>
// // 		</form>
// // 	);
// // };
// // export default MessageInput;
