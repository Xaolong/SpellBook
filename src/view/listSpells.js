pl.view.listSpells = {
    setupUserInterface: function() {
        var tableBodyEl = document.querySelector("table#spells>tbody");
        var i = 0; keys=[], key="", row={};
        Spell.createTestData();
        Spell.loadAll();
        keys = Object.keys(Spell.instances);
        for(i=0;i<keys.length;i++){
            key = keys[i];
            row = tableBodyEl.insertRow();
            row.insertCell().textContent = Spell.instances[key].id;
            row.insertCell().textContent = Spell.instances[key].name;
            row.insertCell().textContent = Spell.instances[key].desc;
            row.insertCell().textContent = Spell.instances[key].duration;
        }
    }
};