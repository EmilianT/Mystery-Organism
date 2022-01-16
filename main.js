// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};


const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    
    mutate () {
      const index = Math.floor(Math.random() * this.dna.length);
      let newDna = returnRandBase();
      
      while (this.dna[index] === newDna) {
        newDna = returnRandBase();
      }
      this.dna[index] = newDna;
      return this.dna;
    },
    
    compareDNA(object) {
      let dnaCount = 0;
      for (let i = 0; i < dna.length; i++) {
        if (this.dna[i] === object.dna[i]) {
          dnaCount++;
        }
      }
      let similarity = ((dnaCount / this.dna.length) * 100);
      console.log(`Similarity between ${this.specimenNum} and ${object.specimenNum} is: ${similarity}% \n`);
    },

    willLikelySurvive() {
      let dnaCount = 0;

      for (let item = 0; item < this.dna.length; item++){
        this.dna[item] === 'C' || this.dna[item] === 'G' ? dnaCount++ : dnaCount;
      }
      if (((dnaCount / this.dna.length) * 100) >= 60) {
        return true;
      } else return false;
    },

    complementStrand() {
      let newArray = [];

      for (let i = 0; i< this.dna.length; i++) {
        if (this.dna[i] === 'A') {
          newArray.push('T');
        } else if (this.dna[i] === 'T') {
          newArray.push('A');
        } else if (this.dna[i] === 'C') {
          newArray.push('G');
        } else {
          newArray.push('C');
        }
      }
      return newArray;
    }
  };
}
/*

With the factory function set up, your team requests that you create 30 instances of pAequor that can survive in their natural environment. 
Store these instances in an array for your team to study later.
*/


let globalArray = [];
let resultArray = [];

function helper(gA) {
  let count = 0;

  for (let i = 0; i < gA.length; i++){
    if (gA[i].willLikelySurvive()) {
      
      resultArray.push(gA[i]);
      count++;
    }
  }
  if (count === 30) return true; else false;
}

function get30() {
  let id = 0;
  let first;
  
  while (resultArray.length < 30) {
    first = pAequorFactory(id, mockUpStrand());
   
    if (first.willLikelySurvive()) {
      resultArray.push(first);
    }

    helper(globalArray);
    id++;
  }
  return resultArray;
}

let x = get30();
let i = 1;

x.map(item => {
  console.log('Number: ' + i + ' ID: ' + item.specimenNum + ' DNA: ' + item.dna + ' Complement: ' + item.complementStrand());
  i++;
});
