export default function input($scope){
  $scope.keycheck = function(event) {
    let action = {};
    action.command = $scope.command || '';
    if(event.keyCode === 13) {
      parse(action);
      $scope.command = '';
    }
  };

  function parse(action) {
    switch (action.command.toLowerCase()) {
      case 'hello':
        action.response = 'Hi.';
        break;
      case 'hi':
        action.response = 'Hello.';
        break;
      case (input[0]):
      case (input[1]):
        action.response = look($scope.location,$scope.near);
        break;
      case (input[2]):
      case (input[9]):
        action.response = inv($scope.inventory);
        break;
      case (input[3]):
      case (input[4]):
        action.response = get($scope.near);
        break;
      case (input[5]):
      case (input[6]):
      case (input[7]):
      case (input[8]):
        action.response = hit($scope.near,$scope.inventory);
        break;
      default:
        action.response = 'I don\'t know how to respond to that.';
    }
    $scope.actions.push(action);
  }

  function look(location, near) {
    let response = '';
    if(location === 'cave') {
      response += 'You seem to be in a cave. ';
      if(near.includes('spider')) {
        response += 'It\'s hard to take your eyes off the giant spider slowly crawling toward you. ';
      } else {
        response += 'Now that the big scary spider is dead, you notice the ground is a little too flat. The rocky walls look a bit like they\'ve been painted. And in fact half the cave is missing. Where you thought was a wall, is in fact a large audience seated in stadium rows. They are applauding. For you.';
      }
    } 
    if(near.includes('a club')) {
      response += ' You think you see a club lying nearby.';
    }
    return response;
  }

  function inv(items) {
    let response = 'You are holding';
    if(items.length < 1) response += ' nothing';
    items.forEach( item => {
      response += ' ' + item;
    });
    response += '.';
    return response;
  }

  function get(near) {
    let response = '';
    if(near.includes('a club')) {
      $scope.inventory.push('a club');
      $scope.near.splice($scope.near.indexOf('a club'),1);
      response += 'You pick up the club.';
    } else {
      response += 'That is not nearby.';
    }
    return response;
  }

  function hit(near, inv) {
    let response = '';
    if(near.includes('spider')) {
      if(inv.includes('a club')) {
        response += 'You let out a might battle roar and smash the giant spider with the club! WHAM! A solid hit! You are very skilled. It looks dead now.';
        $scope.near.splice($scope.near.indexOf('spider'),1);
        $scope.near.push('dead spider');
      } else {
        response += 'With what, your hands??';
      }
    } else {
      response += 'That is not nearby.';
    }
    return response;
  }

  const input = [
    'look around',
    'where am i',
    'inventory',
    'get club',
    'pick up club',
    'kill spider',
    'hit spider',
    'hit spider with club',
    'kill spider with club',
    'inv'
  ];
}