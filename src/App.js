import { useEffect, useState } from 'react';
import './App.css';
import { getMessageFromGPT } from "./api"


const App = () => {
  // pertama kali di load / di render
  // useEffect(() => {
  //   getMessage().then((result) => {
  //     setMessage(result)
  //   })
  // }, [])

  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [year] = useState(new Date().getFullYear());
  const disabledBtn = false;

  const search = async () => {
    if (inputValue.trim() === '') {
      alert('Input tidak boleh kosong!');
      return;
    }
    // Menambahkan pesan dari pengguna
    setMessages((prevMessages) => [...prevMessages, { author: 'You', message: inputValue }]);

    // Mendapatkan balasan dari server (contoh sederhana)
    const response = await getMessage(inputValue);

    // Menambahkan pesan balasan dari server
    setMessages((prevMessages) => [...prevMessages, { author: 'Chat GPT', message: response }]);
  };

  // Fungsi placeholder untuk mendapatkan pesan dari server (dapat diganti dengan implementasi sesungguhnya)
  const getMessage = async (message) => {
    // Contoh sederhana: mengembalikan pesan berdasarkan pesan dari pengguna
    const resultMessage = await getMessageFromGPT(message)
    
    setInputValue('') // reset pesan dari user

    return `${resultMessage}`;
  };

  // Fungsi untuk merender daftar pesan
  const renderMessages = () => {
    return messages.map((msg, index) => {
      const messageLines = msg.message.split('\n')
      const formattedBold = msg.message.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
      return (
        <div key={index} className={msg.author === 'You' ? 'Chat-to-wrapper' : 'Chat-from-wrapper'}>
          <p className="Chat-author">{msg.author}</p>
          {/* <p className="Chat-message">{msg.message}</p> */}
          {/* Menggunakan map untuk membuat elemen <p> untuk setiap baris pesan */}
          {messageLines.map((line, lineIndex) => {
            // Mengganti setiap penanda teks tebal (**...) dengan tag <b>
            const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
            
            // Return elemen <p> dengan teks yang telah diformat
            return <p key={lineIndex} className="Chat-message" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
          })}
        </div>
      );
    });
  };

  return (
    <>
      <div className="App">
        <div className="Chat-wrapper">{renderMessages()}</div>
      </div>
      <div className="Chat-container">
        <input
          className="Chat-input"
          placeholder="Message ChatGPT"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button 
          className="Chat-btn-send" 
          onClick={search}
          disabled={inputValue.trim() === ''} 
        >
          SEND
        </button>
        <p className="Chat-creator-web">@ {year} By orang Gabut!</p>
      </div>
    </>
  );
}

export default App;
