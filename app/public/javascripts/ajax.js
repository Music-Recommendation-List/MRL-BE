console.log('gkkkk');
// $(document).ready() => {
//    $.ajax({
//      url: "/api/comment/1", 
//      type: 'GET',
//      success: (data) => {
//          console.log(data);
//        }});
//    }
//   $.ajax({
//     url: "/api/comment/1",
//     type: 'POST',
//     data: { contents: '히히' },
//     success: (data) => {
//       console.log(data);
//     }
//   });
// }

//C

// $.ajax({
//   url: "/api/comment/1",
//   type: 'POST',
//   data: { contents: '히히' },
//   success: (data) => {
//     console.log(data);
//   }
// });


//R

// $.ajax({
//   url: "/api/comment/1",
//   type: 'GET',
//   success: (data) => {
//     console.log(data);
//   }
// });


//U

// $.ajax({
//   url: "/api/comment/6164f125fa9fb8fa7e4e9da8",
//   type: 'PUT',
//   data: { contents: '하..' },
//   success: (data) => {
//     console.log(data);
//   }
// });



//D

$.ajax({
  url: "/api/comment/6164f125fa9fb8fa7e4e9da8",
  type: 'DELETE',
  success: (data) => {
    console.log(data);
  }
});
