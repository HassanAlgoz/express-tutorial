# EJS View Engine
## Setup
```javascript
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
```

## Render Template with Data
```javascript
res.render('person', {
  id: req.params.id,
  name: "Ahmad Badr",
  age: 19,
  friends: ["Saif", "Hisham", "Yusuf"]
})
```

## Template Data
```xml
<h1> <%= name %> </h1>
<h2>I am <%=age%> years old</h2>
```

## For-Loop
```javascript
<% for(let i = 0; i < friends.length; i++) {%>
  <%= friends[i] %>
<% } %>
```

## Includes
```xml
<% include ./partials/navbar.ejs %>
```
