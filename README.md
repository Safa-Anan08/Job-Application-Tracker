## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
### getElementById returns a single element using id, while getElementsByClassName returns multiple elements of the same class as a live collection ,it changes while DOM updated. querySelector returns first matching element, and querySelectorAll returns all matching elements as a NodeList, where CSS selectors can be used.

### 2. How do you create and insert a new element into the DOM?
### document.createElement() is used to create a new element and then text or attributes are set to it.Then that element is added to the DOM using append(), appendChild() or prepend().

### 3. What is Event Bubbling? And how does it work?
### Event Bubbling is a behavior where when an event occurs on an element, it not only reaches that element but also its parent elements.The event first occurs on the target element, then gradually moves up the DOM tree, triggering its parents, until it is stopped.
### 4. What is Event Delegation in JavaScript? Why is it useful?
### Event Delegation is a technique where instead of having a separate event listener on each element, a listener is placed on their parent element and the target element is handled using event bubbling.This is useful because it uses less memory, improves performance, and dynamically added new elements can also be handled automatically.

### 5. What is the difference between preventDefault() and stopPropagation() methods?
### Using preventDefault() stops the browser from doing things automatically.Using stopPropagation() stops the event from going to the parent elements above, meaning the event stops there.