addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = request.url;

  // Function to parse query strings
  function getParameterByName(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    name = name.replace(/\//g, "");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);

    if (!results) return null;
    else if (!results[2]) return "";
    else if (results[2]) {
      results[2] = results[2].replace(/\//g, "");
    }

    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  // Usage example
  var score = getParameterByName("score");

  if (typeof score === "undefined") {
    score = 0;
  }

  return new Response(svg(score), {
    headers: { "content-type": "image/svg+xml" },
  });
}

function svg(score) {
  let svg = `<svg width="334" height="370" viewBox="0 0 334 370" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .score { font: bold 72px sans-serif; text-anchor: middle; fill: black;}
      .rank { font: bold 20px sans-serif; text-anchor: middle; fill: black;}
      .nftpass { font: bold 14px sans-serif; text-anchor: middle; fill: black;}
    </style>
    <linearGradient id="gradient-normal" x1="0" y1="0" x2="334" y2="370" gradientUnits="userSpaceOnUse">
      <stop stop-color="#77FFED"/>
      <stop offset="0.520833" stop-color="white"/>
      <stop offset="1" stop-color="#6B8CFF"/>
    </linearGradient>
  </defs>

  <rect width="334" height="370" fill="url(#gradient-normal)"/>

  <g>
    <path d="M0 0V-5H-5V0H0ZM334 0H339V-5H334V0ZM334 370V375H339V370H334ZM0 370H-5V375H0V370ZM0 5H334V-5H0V5ZM329 0V370H339V0H329ZM334 365H0V375H334V365ZM5 370V0H-5V370H5Z" fill="black"/>
    <path d="M205 68C195.133 58.1328 194.439 56.5139 194.439 42.561C180.486 42.561 178.867 41.8672 169 32C159.133 41.8672 157.514 42.561 143.561 42.561C143.561 56.5139 142.867 58.1328 133 68C142.867 77.8672 143.561 79.4861 143.561 93.439C157.514 93.439 159.133 94.1328 169 104C178.867 94.1328 180.486 93.439 194.439 93.439C194.516 79.4861 195.21 77.8672 205 68Z" fill="black"/>
    <path d="M177.152 53V80.7419H174.87V75.5806L167.533 53H154V83H160.848V55.2581H163.13V60.3387L170.467 83H184V53H177.152Z" fill="white"/>
  </g>

  <g>
    <text class="score" x="167" y="194">${score}</text>
    <text class="rank" x="167" y="236">MY NFTPASS SCORE</text>
    <text class="rank" x="167" y="260">IS PRETTY NICE</text>
    <text class="nftpass" x="167" y="346">NFTPASS.XYZ</text>
  </g>

</svg>
`;

  return svg;
}
