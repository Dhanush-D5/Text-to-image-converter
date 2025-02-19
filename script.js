
const token = "";//Add your Hugginface API key here
const inp = document.getElementById("input");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const button = document.getElementById("btn");
const out = document.getElementById("output");

			// Function to check if any word in the input matches words in wordSet
function containsAnyWord(str, wordSet) {
	const words = str.toLowerCase().split(' ');
	return words.some(word => wordSet.has(word));
  }
  
  // Combined query function for both image fetches (Optimized for parallel fetch)
  async function query(modelUrl, inputText) {
	const response = await fetch(modelUrl, {
	  headers: {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	  },
	  method: "POST",
	  body: JSON.stringify({ inputs: inputText }),
	});
	const result = await response.blob();
	return result;
  }
  
  // Single event listener for "Enter" key
  inp.addEventListener("keypress", function (event) {
	if (event.key === "Enter") {
	  button.click();
	}
  });
  
  // Button click event handler
  button.addEventListener('click', async function () {
	img1.src = "loading.gif"; // Show loading icon for img1
	img2.src = "loading.gif"; // Show loading icon for img2
  
	/*if (containsAnyWord(inp.value, wordSet)) {
	  out.textContent = "";
	  img1.src = "ss.png";
	  img2.src = "ss.png";
	} else {*/
	  out.textContent = "";
  
	  try {
		// Perform both image fetches in parallel
		const [response1, response2] = await Promise.all([
		  query("https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image", inp.value),
		  query("https://api-inference.huggingface.co/models/kothariyashhh/GenAi-Texttoimage", inp.value + " ")
		]);
  
		// Convert blobs to URLs
		const objectURL1 = URL.createObjectURL(response1);
		const objectURL2 = URL.createObjectURL(response2);
  
		// Assign the URLs to img1 and img2
		img1.src = objectURL1;
		img2.src = objectURL2;
  
		// Both images will now appear at the same time after both are loaded
		out.textContent = "";
		
	  } catch (error) {
		out.textContent = "Error fetching images. Please try again.";
		console.error(error);
	  }
	//}
  });