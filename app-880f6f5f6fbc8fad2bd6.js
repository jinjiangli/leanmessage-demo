webpackJsonp([1],[function(n,e,t){t(26),n.exports=t(18)},,,,,,,,,,,,function(n,e){},function(n,e){},function(n,e){},function(n,e){},function(n,e){},,function(n,e,t){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}var s=t(1),i=o(s);i.default.module("leanMessage").run(["$templateCache",function(n){n.put("app/conversation/conversation.html",'<md-sidenav class="menu md-sidenav-left md-whiteframe-z2" layout="column" ng-class="{ \'under-mask\': !conversation.isMenuOpen } " md-component-id="menu" md-is-open="conversation.isMenuOpen" md-is-locked-open="$mdMedia(\'gt-sm\')">\n  <div flex layout="column" style="overflow:auto">\n    <div class="logo">LeanMessage</div>\n    <md-list flex>\n\n      <!-- Robots List-->\n      <md-divider></md-divider>\n      <md-subheader class="md-no-sticky">小机器人</md-subheader>\n      <md-list-item ng-repeat="conv in sysConvs | orderBy: \'-lastMessageAt\'" ng-click="changeTo(conv)" ng-class="{\'active\': conv.id === currentConversation.id}">\n        <p layout="row" layout-align="center center">\n          {{::conv.name}}\n          <span flex></span>\n          <span ng-if="conv.unreadMessagesCount" class="unreadCount">{{conv.unreadMessagesCount}}</span>\n        </p>\n      </md-list-item>\n      <!-- Robots List End -->\n\n      <!-- Transiant Convsations List-->\n      <md-divider></md-divider>\n      <md-subheader class="md-no-sticky">临时聊天室</md-subheader>\n      <md-list-item ng-repeat="conv in transConvs | orderBy: \'-lastMessageAt\'" ng-click="changeTo(conv)" ng-class="{\'active\': conv.id === currentConversation.id}">\n        <p layout="row" layout-align="center center">\n          {{::conv.name}}\n          <span flex></span>\n          <span ng-if="conv.unreadMessagesCount" class="unreadCount">{{conv.unreadMessagesCount}}</span>\n        </p>\n      </md-list-item>\n      <!-- Transiant Convsations List End -->\n\n      <!-- Group Conversations List -->\n      <md-divider></md-divider>\n      <md-subheader class="md-no-sticky">群聊</md-subheader>\n      <md-list-item ng-repeat="conv in normalConvs | orderBy: \'-lastMessageAt\'" ng-if="(conv.members.length > 2)" ng-click="changeTo(conv)" ng-class="{\'active\': conv.id === currentConversation.id}">\n        <span>123</span>\n        <p layout="row" layout-align="center center">\n          {{conv.name || \'群 \' + conv.id.slice(-4) }}\n          <span flex></span>\n          <span ng-if="conv.unreadMessagesCount" class="unreadCount">{{conv.unreadMessagesCount}}</span>\n        </p>\n      </md-list-item>\n      <!-- Group Conversations List End -->\n\n      <!-- Single Conversations List -->\n      <md-divider></md-divider>\n      <md-subheader class="md-no-sticky">单聊</md-subheader>\n      <md-list-item ng-repeat="conv in normalConvs | orderBy: \'-lastMessageAt\'" ng-if="conv.members.length === 2" ng-click="changeTo(conv)" ng-class="{\'active\': conv.id === currentConversation.id}">\n        <p layout="row" layout-align="center center">\n          {{getSingleConvTarget(conv.members)}}\n          <span flex></span>\n          <span ng-if="conv.unreadMessagesCount" class="unreadCount">{{conv.unreadMessagesCount}}</span>\n        </p>\n      </md-list-item>\n      <div class="empty-list-hint" layout-padding>点击任意用户 ID 开始单聊</div>\n    </md-list>\n  </div>\n  <!-- Single Conversations List End -->\n\n  <!--Personal Info-->\n  <md-divider></md-divider>\n  <div class="user" layout layout-align="center center" layout-padding>\n    <!--<img gravatar-src-once="transientEmail" gravatar-size="40">-->\n    <span flex>当前用户:{{imClient.id}}</span>\n    <md-button class="md-icon-button" aria-label="Logout" ng-click="logout()">\n      <md-icon>exit_to_app</md-icon>\n    </md-button>\n  </div>\n  <!--Personal Info End-->\n</md-sidenav>\n\n<!-- Nested Views for conversations.message -->\n<div layout flex ui-view>\n</div>\n'),n.put("app/login/logging.html","<h1>正在登录……</h1>"),n.put("app/login/login.html",'<div class="login-container" layout layout-align="center center" flex>\n  <md-whiteframe class="md-whiteframe-z1 login-frame" layout layout-align="center center">\n    <md-content class="loginForm" layout-align="center" layout="column" flex>\n      <form name="loginForm" ng-submit="login()" layout="column" layout-align="center" flex>\n        <div class="logo">LeanMessage</div>\n        <div class="client-form" layout="column">\n          <md-input-container>\n            <label>ID</label>\n            <input ng-model="user.id" required>\n          </md-input-container>\n          <md-button flex ng-click="login()">开始聊天</md-button>\n        </div>\n      </form>\n    </md-content>\n  </md-whiteframe>\n</div>\n'),n.put("app/components/message/message.html",'<div ng-if="displayTime" class="time">{{message.timestamp | date:\'H:mm\'}}</div>\n<div class="message" ng-if="message.id" ng-class="{mine: isMine}" layout="column">\n    <div class="user" ng-if="!isMine" ng-click="onNameClick()">{{ message.from }}</div>\n    <div layout>\n        <md-icon ng-if="message.status === messageStatus.SENDING" animation="fadeInOut">reply</md-icon>\n        <md-icon ng-if="message.status === messageStatus.FAILED">error</md-icon>\n        <div class="content" ng-class="{sending: message.status}">{{ message.text }}</div>\n    </div>\n</div>\n\n<div class="tips" ng-if="!message.id">{{ message.text }}</div>\n'),n.put("app/conversation/conversationMessage/conversation.message.html",'<div flex layout="column">\n\n  <md-toolbar>\n    <div class="md-toolbar-tools">\n      <!--<md-button class="md-icon-button menu-button" aria-label="Menu" hide-gt-sm ng-click="conversationMessage.toggle(\'menu\')">-->\n        <!--<md-icon>menu</md-icon>-->\n        <!--<span ng-if="hasUnreadMessage" class="notice"></span>-->\n      <!--</md-button>-->\n      <h2>\n        <span ng-if="currentConversation.members.length !== 2">{{ currentConversation.name }}</span>\n        <span ng-if="currentConversation.members.length === 2">{{ getSingleConvTarget(currentConversation.members) }}</span>\n      </h2>\n      <span flex></span>\n\n      <!--TODO: SDK 加上 sys 字段后,通过判断 sys 字段替换掉现在的 ng-if-->\n      <md-button class="md-icon-button" aria-label="Add Clients" ng-if="currentConversation.members.length!= 0 || currentConversation.transient" ng-click="showAddUserDialog($event)">\n        <md-icon>add</md-icon>\n      </md-button>\n      <!--<md-button ng-if="conversationMessage.isGroupConversation && conversationMessage.conv.members.length"-->\n                <!--class="md-icon-button"-->\n                <!--aria-label="Online Clients"-->\n                <!--hide-gt-md-->\n                <!--ng-click="conversationMessage.toggle(\'online\')">-->\n        <!--<md-icon>group</md-icon>-->\n      <!--</md-button>-->\n    </div>\n  </md-toolbar>\n\n  <!--infinite-list-->\n  <md-content infinite-list infinite-scroll="loadMoreMessages()" layout-padding flex class="messages">\n    <div class="messages-wrapper">\n      <!--messages-->\n      <message ng-repeat="(index, message) in messages" message="message" ng-if="message" previous-message="messages[index - 1]" on-name-click="toSingleConv(message.from)" is-mine="message.from == imClient.id"></message>\n      <!--messages end-->\n      <div id="message-view-bottom"></div>\n    </div>\n  </md-content>\n  <!--infinite-list End-->\n\n  <md-content layout layout-align="center center" class="editor-wrapper">\n    <form class="editor" ng-submit="send()" layout layout-align="center center" flex>\n      <md-input-container md-no-float flex class="textarea">\n        <textarea ng-model="draft" placeholder="说点什么……" ng-keypress="editorChangedHandler($event)"></textarea>\n      </md-input-container>\n      <md-button class="md-icon-button" aria-label="Send" ng-click="send()">\n        <md-icon>send</md-icon>\n      </md-button>\n    </form>\n  </md-content>\n</div>\n\n<!--members list -->\n<md-sidenav id="online-aside" ng-if="currentConversation.members.length > 2" class="md-sidenav-right md-whiteframe-z2" md-component-id="online" md-is-locked-open="$mdMedia(\'gt-md\')" layout="column">\n  <md-toolbar>\n    <div class="md-toolbar-tools">\n      <!--<md-button class="md-icon-button" aria-label="Back" hide-gt-sm ng-click="conversationMessage.close(\'online\')">-->\n        <!--<md-icon>arrow_back</md-icon>-->\n      <!--</md-button>-->\n      <h2>群聊成员 ({{currentConversation.members.length}})</h2>\n      <span flex></span>\n      <!--<md-button class="md-icon-button" aria-label="Search" ng-click="conversationMessage.toggle(\'online-search\')">-->\n        <!--<md-icon>search</md-icon>-->\n      <!--</md-button>-->\n    </div>\n  </md-toolbar>\n  <md-list class="square-clients" flex>\n    <md-list-item ng-repeat="clientId in currentConversation.members.slice(0, maxResultsAmount)" ng-click="toSingleConv(clientId)">\n      <p> {{ clientId }} </p>\n    </md-list-item>\n    <p ng-if="currentConversation.members.length > maxResultsAmount" class="max-results-amount-hint">最多显示 {{:: maxResultsAmount }} 位成员</p>\n  </md-list>\n</md-sidenav>\n\n\n<!--// TODO : 搜索当前群聊的成员-->\n<!--<md-sidenav id="online-aside"-->\n            <!--ng-if="conversationMessage.isGroupConversation && conversationMessage.conv.members.length"-->\n            <!--class=" md-sidenav-right md-whiteframe-z2"-->\n            <!--md-component-id="online-search"-->\n            <!--layout="column">-->\n  <!--<form ng-submit="$event.preventDefault()">-->\n    <!--<div class="search-box" layout layout-align="center center">-->\n      <!--<md-button class="md-icon-button" aria-label="Back" ng-click="conversationMessage.close(\'online-search\')">-->\n        <!--<md-icon>arrow_back</md-icon>-->\n      <!--</md-button>-->\n      <!--<input type="text" flex ng-model="conversationMessage.queryString" ng-change="conversationMessage.query(conversationMessage.queryString)" placeholder="搜索在线用户" md-sidenav-focus>-->\n      <!--<md-button class="md-icon-button" aria-label="Clear" ng-click="conversationMessage.clearQuery()" ng-hide="conversationMessage.queryString===\'\'">-->\n        <!--<md-icon>clear</md-icon>-->\n      <!--</md-button>-->\n    <!--</div>-->\n    <!--<md-divider></md-divider>-->\n\n  <!--</form>-->\n  <!--<md-list class="result" flex>-->\n    <!--<md-list-item ng-repeat="client in conversationMessage.queryClients.slice(0, conversationMessage.maxResultsAmount)" ng-click="conversationMessage.changeTo(\'@\' + client)">-->\n      <!--<p class="result-item"> {{ client }} </p>-->\n    <!--</md-list-item>-->\n    <!--<p ng-if="conversationMessage.queryClients.length > conversationMessage.maxResultsAmount" class="max-results-amount-hint">最多显示 {{:: conversationMessage.maxResultsAmount }} 条结果</p>-->\n  <!--</md-list>-->\n<!--</md-sidenav>-->\n')}])},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t(2);t(12),e.default=function(){"ngInject";return{restrict:"E",templateUrl:"app/components/message/message.html",scope:{message:"=",previousMessage:"=",isMine:"=",onNameClick:"&"},link:function(n){if(n.messageStatus=o.MessageStatus,n.previousMessage&&n.previousMessage){var e=Math.floor(n.message.timestamp/6e4),t=Math.floor(n.previousMessage.timestamp/6e4);e!==t&&(n.displayTime=!0)}}}}},function(n,e,t){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}Object.defineProperty(e,"__esModule",{value:!0});var s=t(17),i=o(s);e.default=["$timeout",function(n){"ngInject";return{transclude:!0,scope:{infiniteScroll:"&",infiniteScrollDistance:"=?"},template:"<div ng-transclude></div>",link:function(e,t){void 0===e.infiniteScrollDistance&&(e.infiniteScrollDistance=200);var o=!1,s=(0,i.default)(".messages-wrapper");t.on("scroll",function(){if(!o){var a=(0,i.default)(t[0]);a.scrollTop()<e.infiniteScrollDistance&&!function(){o=!0;var t=s.height(),i=e.infiniteScroll();!function(n){i&&"function"==typeof i.then?i.then(n):n()}(function(){return n(function(){a.scrollTop(a.scrollTop()+s.height()-t),o=!1},0)})}()}})}}}]},function(n,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=["LeanRT",function(n){"ngInject";return{isCached:function(){try{return null!==localStorage.getItem("clientId")}catch(n){return!1}},cache:function(n){localStorage.setItem("clientId",n)},getCachedInfo:function(){try{return localStorage.getItem("clientId")}catch(n){return}},login:function(e){return n.realtime.createIMClient(e)},isLoggedin:function(){return!!n.imClient},logout:function(){return localStorage.removeItem("clientId"),n.imClient.close()}}}]},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),t(13),e.default=["$scope","LeanRT","$state","$stateParams","$mdSidenav","userService",function(n,e,t,o,s,i){"ngInject";n.$mdSidenav=s,n.imClient=e.imClient,n.normalConvs=[],n.transConvs=[],n.sysConvs=[],n.joinedTransConvs=[],n.transientEmail="test@test.com";var a=function(){return n.imClient.getQuery().containsMembers([n.imClient.id]).find()},r=function(){return n.imClient.getQuery().equalTo("tr",!0).addDescending("lm").limit(1).find()},l=function(){return n.imClient.getQuery().equalTo("sys",!0).find()};n.getSingleConvTarget=function(e){return e[0]===n.imClient.id?e[1]:e[0]},n.getConversations=function(){return Promise.all([l(),r(),a()]).then(function(e){n.sysConvs=e[0],n.transConvs=e[1],n.normalConvs=e[2],n.$digest()})},n.switchToConv=function(o){n.currentConversation=o,e.currentConversation=o,n.currentConversation.markAsRead().then(function(){return setTimeout(function(){t.go("conversations.message",{convId:o.id})},0)}).then(function(){n.$digest()}).catch(console.error.bind(console))},n.changeTo=function(e){e.tr===!0?n.joinedTransConvs.findIndex(n.imClient.id)===-1&&e.join().then(function(e){n.joinedTransConvs.push(n.imClient.id),n.switchToConv(e)}):n.switchToConv(e)},n.getConversations().then(function(){var e=localStorage.getItem("initConvId");e?n.imClient.getConversation(e).then(function(e){localStorage.removeItem("initConvId"),e&&n.switchToConv(e)}).catch(console.error.bind(console)):n.transConvs[0].join().then(function(e){n.joinedTransConvs.push(n.imClient.id),n.switchToConv(e)}).catch(console.error.bind(console))}).catch(console.error.bind(console)),n.logout=function(){i.logout().then(function(){e.imClient=null,t.go("login")})}}]},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),t(14);var o=t(29),s=t(2);e.default=["$scope","LeanRT","$location","$anchorScroll","$mdDialog","$stateParams",function(n,e,t,i,a,r){"ngInject";n.messages=[],n.imClient=e.imClient,n.messageIterator=n.currentConversation.createMessagesIterator({limit:20}),n.hasLoadAllMessages=!1,n.maxResultsAmount=50,n.draft="";var l=function(){setTimeout(function(){i("message-view-bottom")},0)};if(n.send=function(){if(n.draft){var e=new s.TextMessage(n.draft);n.draft="",n.messages.push(e),n.currentConversation.send(e).then(function(){n.$digest(),l()}).catch(function(n){console.log(n)})}},n.toSingleConv=function(e){n.imClient.createConversation({members:[e],name:e+" 和 "+n.imClient.id+" 的对话",transient:!1,unique:!0}).then(function(e){n.switchToConv(e)}).catch(console.error.bind(console))},n.loadMoreMessages=function(){if(!n.hasLoadAllMessages)return n.messageIterator.next().then(function(e){e.done&&(n.hasLoadAllMessages=!0),n.messages=e.value.concat(n.messages),n.$digest()})},n.showAddUserDialog=function(e){var t=a.prompt().title("请输入要邀请的成员的 ClientId").placeholder("ClientId").ariaLabel("ClientId").targetEvent(e).ok("邀请他进入对话").cancel("取消");a.show(t).then(function(e){return n.currentConversation.add([e])}).then(function(){}).catch(function(n){n&&console.log(n)})},n.editorChangedHandler=function(e){if(13===e.keyCode&&!e.shiftKey)return n.send(),e.preventDefault(),!1},n.currentConversation.on("membersjoined",function(e){n.messages.push({text:e.invitedBy+" 邀请 "+e.members+" 进入该对话",timestamp:new Date}),n.$digest()}),n.imClient.on("message",function(e,t){t===n.currentConversation&&(n.currentConversation.markAsRead(),n.messages.push(e),l()),t.transient&&1===n.transConvs.indexOf(t)&&n.transConvs.push(t),t.transient||n.normalConvs.indexOf(t)!==-1||n.normalConvs.push(t),n.$apply()}),n.imClient.on("invited",function(e,t){if(t.transient)n.transConvs.push(t);else{var o=!0;n.normalConvs.forEach(function(n){n.id===t.id&&(o=!1)}),o&&n.normalConvs.push(t)}n.$apply()}),r.convId===n.currentConversation.id)n.currentConversation=e.currentConversation;else{var c=o._.find(n.sysConvs,function(n){return n.id===r.convId}),d=o._.find(n.transConvs,function(n){return n.id===r.convId}),u=o._.find(n.normalConvs,function(n){return n.id===r.convId}),m=c||d||u;m&&n.changeTo(m)}n.loadMoreMessages().then(function(){l()}).catch(console.error.bind(console))}]},function(n,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=["$state","userService","LeanRT",function(n,e,t){"ngInject";var o=e.getCachedInfo();e.login(o).then(function(o){t.imClient=o,e.connected=!0,n.go("conversations")}).catch(console.error.bind(console))}]},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),t(15),e.default=["$scope","LeanRT","$state","userService",function(n,e,t,o){"ngInject";n.user={},n.login=function(){o.login(n.user.id).then(function(n){e.imClient=n,o.cache(n.id),o.connected=!0,t.go("conversations")}).catch(console.error.bind(console))}}]},function(n,e,t){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}Object.defineProperty(e,"__esModule",{value:!0}),e.app=void 0;var s=t(1),i=o(s);t(9),t(8),t(11);var a=t(2),r=t(28),l=o(r);t(16);var c=t(27),d=o(c),u=t(20),m=o(u),g=t(19),v=o(g),f=t(21),p=o(f),C=t(25),h=o(C),b=t(24),y=o(b),M=t(22),I=o(M),x=t(23),k=o(x),S=e.app="leanMessage",T="m7baukzusy3l5coew0b3em5uf4df5i2krky0ypbmee358yon";i.default.module(S,["ui.router","ngMaterial"]).config(l.default).factory("LeanRT",function(){var n={},e=new a.Realtime({appId:T,region:"cn"});return n.realtime=e,n.imClient=null,n.currentConversation=null,n}).service("userService",p.default).run(d.default).directive("infiniteList",m.default).directive("message",v.default).controller("loginCtrl",h.default).controller("loggingCtrl",y.default).controller("convCtrl",I.default).controller("convMsgCtrl",k.default)},function(n,e){"use strict";function t(n,e,t){"ngInject";n.$on("$stateChangeStart",function(n,o,s){if("login"!==o.name&&!t.isLoggedin())if(t.isCached()){if("logging"===o.name)return;n.preventDefault(),s.convId&&localStorage.setItem("initConvId",s.convId),e.go("logging")}else setTimeout(function(){return e.go("login")},0)})}t.$inject=["$rootScope","$state","userService"],Object.defineProperty(e,"__esModule",{value:!0}),e.default=t},function(n,e){"use strict";function t(n,e){e.otherwise("/"),n.state("login",{url:"/",templateUrl:"app/login/login.html",controller:"loginCtrl"}).state("conversations",{url:"/conversations",templateUrl:"app/conversation/conversation.html",controller:"convCtrl"}).state("conversations.message",{url:"/:convId",templateUrl:"app/conversation/conversationMessage/conversation.message.html",controller:"convMsgCtrl"}).state("logging",{url:"/logging",templateUrl:"app/login/logging.html",controller:"loggingCtrl"})}t.$inject=["$stateProvider","$urlRouterProvider"],Object.defineProperty(e,"__esModule",{value:!0}),e.default=t}]);