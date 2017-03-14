function Spell( info ){
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
    var spell = new Spell(info);
    Spell.instances[info.name] = spell;
    console.log("Spell "+info.name+" added!");
};

Spell.update= function(info){
    var Spell = Spell.instances[info.name];
    if(Spell.desc!=info.desc) Spell.desc=info.desc;
    if(Spell.name!=info.name) Spell.name=info.name;
    if(Spell.duration!=info.duration) Spell.duration=info.duration;
    if(Spell.alignemnt!=info.alignemnt) Spell.alignemnt=info.alignemnt;
    console.log("Spell" +Spell.name +"modified");
}

Spell.destroy = function(name){
    if(Spell.instances[name]){
        console.log("Spell "+ Spell.instances[name].name+" deleted!");
        delete Spell.instances[name];
    } else {
        console.log("There is no such Spell");
    }
};

Spell.createTestData = function(){
    Spell.instances[1] = new Spell({name:"Light",desc:"Wololo",duration:5,alignemnt:"Good"});
    Spell.instances[2] = new Spell({name:"Aname",desc:"Wololo",duration:5,alignemnt:"Good"});
    Spell.instances[3] = new Spell({name:"Cure wounds, light",desc:"Wololo",duration:5,alignemnt:"Good"});
    Spell.instances[4] = new Spell({name:"Bless",desc:"Wololo",duration:5,alignemnt:"Good"});
    Spell.saveAll();
}