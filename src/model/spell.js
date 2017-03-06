function Spell( info ){
    this.id = info.id;
    this.name = info.name;
    this.desc = info.desc;
    this.duration = info.duration;
    this.alignemnt = info.alignemnt;
    this.type = info.type;
}

Spell.instances = {};

// spellListString = localStorage["spellList"];

// spellList = Json.parse(spellListString);

Spell.convertRow2Obj = function (spellRow){
    var spell = new Spell(spellRow);
    return spell;
}

Spell.loadAll = function() {
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
            Spell.instances[key]=Spell.convertRow2Obj(spellList[key]);
        }
    }
};

Spell.saveAll = function() {
    var spellListString = "", error=false,
    nmrOfSpells = Object.keys(Spell.instances).length;
    try {
        spellListString=JSON.stringify(Spell.instances);
        localStorage["spellList"] = spellListString;
    } catch (e) {
        alert("Error when writing to local storage" + e);
        error=true;
    }
    if(!error) console.log(nmrOfSpells + " spells saved.");
};

Spell.add = function(info){
    var Spell = new Spell(info);
    Spell.instances[info.id]= Spell;
    console.log("Spell "+info.name+" added!");
};

Spell.update= function(info){
    var Spell = Spell.instances[info.id];
    if(Spell.desc!=info.desc) Spell.desc=info.desc;
    if(Spell.name!=info.name) Spell.name=info.name;
    if(Spell.duration!=info.duration) Spell.duration=info.duration;
    if(Spell.alignemnt!=info.alignemnt) Spell.alignemnt=info.alignemnt;
    console.log("Spell" +Spell.name +"modified");
}

Spell.destroy = function(id){
    if(Spell.instances[id]){
        console.log("Spell "+ Spell.instances[id].name+" deleted!");
        delete Spell.instances[id];
    } else {
        console.log("There is no such Spell");
    }
};

Spell.createTestData = function(){
    Spell.instances[1] = new Spell({id:1,name:"Light",desc:"Wololo",duration:5,alignemnt:"Good"});
    Spell.instances[2] = new Spell({id:2,name:"Aid",desc:"Wololo",duration:5,alignemnt:"Good"});
    Spell.instances[3] = new Spell({id:3,name:"Cure wounds, light",desc:"Wololo",duration:5,alignemnt:"Good"});
    Spell.instances[4] = new Spell({id:4,name:"Bless",desc:"Wololo",duration:5,alignemnt:"Good"});
    Spell.saveAll();
}