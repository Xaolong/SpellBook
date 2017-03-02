function spell( info ){
    this.id = info.id;
    this.name = info.name;
    this.desc = info.desc;
    this.duration = info.duration;
    this.alignemnt = info.alignemnt;
    this.type = info.type;
}

spell.instances = {};

// spellListString = localStorage["spellList"];

// spellList = Json.parse(spellListString);

spell.convertRow2Obj = function (spellRow){
    var spell = new spell(spellRow);
    return spell;
}

spell.loadAll = function() {
    var i=0, key="", keys=[], spellListString = "", spellList={};
    try {
        if(localStorage["spellList"]){
            spellListString = localStorage["spellList"];
        }
    } catch (e) {
        alert("Error when reading from Local Storage \n" + e);
    }
    if(spellListString){
        spellList=JSON.parse(spellListString);
        keys = Object.keys(spellList);
        console.log(keys.length +" spells loaded");
        for(i=0;i<keys.length;i++){
            key = keys[i];
            spell.instances[key]=spell.convertRow2Obj(spellList[key]);
        }
    }
};

spell.saveAll = function() {
    var spellListString = "", error=false,
    nmrOfSpells = Object.keys(spell.instances).length;
    try {
        spellListString=JSON.stringify(spell.instances);
        localStorage["spellList"] = spellListString;
    } catch (e) {
        alert("Error when writing to local storage" + e);
        error=true;
    }
    if(!error) console.log(nmrOfSpells + "spells saved.");
};

spell.add = function(info){
    var spell = new spell(info);
    spell.instances[info.id]= spell;
    console.log("Spell "+info.name+" added!");
};

spell.update= function(info){
    var spell = spell.instances[info.id];
    if(spell.desc!=info.desc) spell.desc=info.desc;
    if(spell.name!=info.name) spell.name=info.name;
    if(spell.duration!=info.duration) spell.duration=info.duration;
    if(spell.alignemnt!=info.alignemnt) spell.alignemnt=info.alignemnt;
    console.log("Spell" +spell.name +"modified");
}

spell.destroy = function(id){
    if(spell.instances[id]){
        console.log("Spell "+ spell.instances[id].name+" deleted!");
        delete spell.instances[id];
    } else {
        console.log("There is no such spell");
    }
};

spell.createTestData = function(){
    spell.instances[1] = new spell({id:1,name:"Light",desc:"Wololo",duration:5,alignemnt:"Good"});
    spell.instances[2] = new spell({id:2,name:"Aid",desc:"Wololo",duration:5,alignemnt:"Good"});
    spell.instances[3] = new spell({id:3,name:"Cure wounds, light",desc:"Wololo",duration:5,alignemnt:"Good"});
    spell.instances[4] = new spell({id:4,name:"Bless",desc:"Wololo",duration:5,alignemnt:"Good"});
    spell.saveAll();
}