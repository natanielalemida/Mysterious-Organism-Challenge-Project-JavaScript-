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

const pAequorFactory = (number,bases) => {

  return {
    scpecimenNum: number,
    dna: bases,

    mutate(){

      let index = Math.floor(Math.random() * this.dna.length);
      
      let rand = returnRandBase();

      while(rand === this.dna[index]){
        rand = returnRandBase();
      }

      this.dna[index] = rand;

    },

    compareDNA(pAequor){

      let ret = 0;

      for(let i = 0; i < this.dna.length; i++){
        
        if(this.dna[i] === pAequor.dna[i]) ret++;

      }

      ret = Math.floor((ret / this.dna.length) * 100);
      
      console.log(`specimen #${this.scpecimenNum} and specimen #${pAequor.scpecimenNum} have ${ret}% DNA in common`)

    },

    willLikelySurvive(){

      let prop = 0;

      for(let key in this.dna){

        if(this.dna[key] === 'C' || this.dna[key] === 'G') prop++;

      }

      if(prop/this.dna.length >= 0.6){
        return true;
      }else{
        return false;
      }


    },

    toString(){

      if(this.willLikelySurvive() === true){
        return this.scpecimenNum + ": " + this.dna.join("|") + " - high chance of survival";
      }else{
        return this.scpecimenNum + ": " + this.dna.join("|") + " - normal chance of survival";
      }
    },

    complementStrand(){

      let comp = pAequorFactory(-this.scpecimenNum,[]);

      for(let key in this.dna){

        switch(this.dna[key]){
          
          case 'A':
            comp.dna.push('T');
            break;
          case 'T':
            comp.dna.push('A');
            break;
          case 'C':
            comp.dna.push('G');
            break;
          case 'G':
            comp.dna.push('C');
            break;
          default:
            break;

        }

      }

      return comp;
      
    }

  }

}


function generatePool(){
  const pool = [];
  let i = 1;
  let p = pAequorFactory(i,mockUpStrand());
  while(i<=30){
    p = pAequorFactory(i,mockUpStrand());
      if(p.willLikelySurvive() === true){
        pool.push(p);
      i++;
      }
  }
  
  return pool;
}

const pool = generatePool();

console.log(pool.length);

console.log(pool[0].toString());

pool[0].mutate();

console.log(pool[0].toString());

console.log(pool[1].toString());

pool[0].compareDNA(pool[1]);

console.log(pool[1].complementStrand().toString());

