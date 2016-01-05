if (Posts.find().count() === 0) {
  Posts.insert({
    date: '12 Janv 3014',
    title: 'Article de test',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro nihil, assumenda dolorum quaerat. Amet, temporibus labore corrupti nobis at nam molestias, quaerat, deserunt aut vel adipisci neque. Delectus, distinctio in.'
  });
}

if (Objects.find().count() === 0) {
  Objects.insert({
    date: '12 Janv 3014',
    title: 'Article de test',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro nihil, assumenda dolorum quaerat. Amet, temporibus labore corrupti nobis at nam molestias, quaerat, deserunt aut vel adipisci neque. Delectus, distinctio in.',
    nameObject: 'Cube',
    dateObject: 12/24/3432,
    heightObject: 24,
    widthObject: 34,
    weightObject: 14,
    idObject: 01
  });
}