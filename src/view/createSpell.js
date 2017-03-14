pl.view.createSpell = {
    setupUserInterface: function () {
        var saveButton = document.forms['spell'].commit;
        Spell.loadAll();

        saveButton.addEventListener("click", pl.view.createSpell.handleSaveButtonClickEvent);
        window.addEventListener("beforeunload", function () {
            Spell.saveAll();
        });
    },
    handleSaveButtonClickEvent: function () {
        console.log("Nakurwiam czara");
        var formEl = document.forms['spell'];
        var slots = { name:formEl.name.value,
            desc:formEl.desc.value,
            duration:formEl.duration.value,
            alignemnt:formEl.alignment.value,
            type:formEl.type.value};
        Spell.add(slots);
        
        formEl.reset();
    }
};