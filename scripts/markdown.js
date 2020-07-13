let app = new Vue({
  el: '#app',
  data: {
    selectId: null,
    notes: [],
    nextid: 0,
  },
  methods: {
    addNote: function(){
      const time = Date.now();
      const note = {
        id: this.nextid,
        title: `new note ${this.nextid}`,
        content: "",
        created: time,
        favorite: false
      };
      this.notes.push(note);
      this.nextid++;
      this.IdSelected(note)
    },
    IdSelected(note){
      this.selectId = note.id;
    },
    favoritechange(){
      this.selectedNote.favorite ^=true;
    },
    removenote(){
      if(this.selectedNote && confirm(`Delete the note`)){
        const index = this.notes.indexOf(this.selectedNote);
        if(index !== -1){
          this.notes.splice(index,1);
        }
      }else{
        return false;
      }
    },
    dateconvert(){
      let d = this.selectedNote.created;
      let time = new Date(d);
      return time.toLocaleString();
    },
    linecount(){
      if(this.selectedNote.content ===''){
        return 0;
      }else{
        let pattern = /\n|\r\n/g;
        let arr = this.selectedNote.content.matchAll(pattern);
        arr = [...arr];
        return arr.length + 1;
      }
    },
    wordcount(){
      let str_mo = this.selectedNote.content.replace(/\n|\r\n/,' ');
      let arr = str_mo.split(' ');
      return arr.length;
    },
    charactercount(){
      let str_mo = this.selectedNote.content.replace(/\n|\r\n|\s/,'');
      return str_mo.length;
    }
  },
  computed: {
    selectedNote(){
      return this.notes.find(note => this.selectId === note.id);
    },
    sortedList(){
      return this.notes.slice()
             .sort((a,b) => (a.created - b.created))
             .sort((a, b) => (a.favorite === b.favorite) ? 0 : a.favorite ? -1: 1);
    },
    info(){
    let time = this.dateconvert();
    let line = this.linecount();
    let words = this.wordcount();
    let chars = this.charactercount();
    let information = `Created on ${time}; Line length ${line}; words length: ${words}; chars: ${chars}.`;
    return information;
  }
  },
});

app.$mount('#app');