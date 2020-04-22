const generate = (seed) => {
    let seedRandom='';
    for(let i = 0; i < seed.length-1; i++){
        seedRandom = seedRandom+''+seed.charCodeAt(i);

    }
    seedRandom = seedRandom+Math.floor(Math.random() * (1000 - 10)) + 1;
    let code = parseInt(seedRandom);
    return code.toString(36);
}

module.exports = generate;