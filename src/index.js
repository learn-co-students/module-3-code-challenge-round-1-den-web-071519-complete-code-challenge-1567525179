document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3326 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  fetch(imageURL)
    .then(response => response.json())
    .then(picture => {
        let $img = document.querySelector("img")
        $img.src = picture.url

        let imageTitle = document.querySelector("#name")
        imageTitle.innerText = picture.name

        let likes = document.querySelector("#likes")
        likes.innerText = picture.like_count

        let $ul = document.querySelector("#comments")
        
        picture.comments.forEach(comment => {
          let $li = document.createElement("li")
          let $deleteButton = document.createElement("button")

          $deleteButton.innerText = "Delete"
          $deleteButton.id = comment.id

          $deleteButton.onclick = function(){
            $ul.removeChild($li)

            fetch(commentsURL + `/${comment.id}`, {
              method: "DELETE"
            }).then(response => response.json())
            .then(response => {
              console.log(response)
            })

          }

          $li.innerText = comment.content

          $li.append($deleteButton)
          $ul.append($li)

        })

    }).catch(error => {
        console.log(error.message)
    })

let $button = document.querySelector("#like_button")
$button.addEventListener("click", function(){
  let likes = document.querySelector("#likes").innerText
  let numLikes = parseInt(likes, 10)
  numLikes += 1
  document.querySelector("#likes").innerText = numLikes

  fetch(likeURL, {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        image_id: 3326
    })
  }).then(response => response.json())
  .then(response => {
    console.log(response)
  })
})


let $form = document.querySelector("#comment_form")
$form.addEventListener("submit", event => {
  event.preventDefault()

  let input = document.querySelector("input")
  let comment = input.value

  let $ul = document.querySelector("#comments")
  let $li = document.createElement("li")
  let $deleteButton = document.createElement("button")

  $deleteButton.innerText = "Delete"
  
  $li.innerText = comment

  $li.append($deleteButton)
  $ul.append($li)

  $form.reset()
  // debugger;
  fetch(commentsURL, {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        image_id: 3326,
        content: comment
    })
  }).then(response => response.json())
  .then(response => {
    console.log(response)
  })
})

})

