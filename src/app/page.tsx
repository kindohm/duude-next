export default function Home() {
  const handleClick = async () => {
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // send empty body
      });
      const result = await res.json();
      // Optionally handle result (e.g., show a message)
      console.log(result);
    } catch (err) {
      console.error("Failed to send notification", err);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>duuude</button>
    </div>
  );
}
