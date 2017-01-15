var obj = {
  id: 1,
  get: function() {
    console.log('this.id', this.id);
  }
};

var id = 2;

obj.get();

obj.get.call(id);
