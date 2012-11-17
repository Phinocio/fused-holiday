define(["animation","input","map"],function(e,t,n){return{walk:function(e,n){var r=this.on.collision.call(this,e,n);if(r.triggers.indexOf("left")>-1||r.triggers.indexOf("right")>-1)n=r.event;return!t.keys.left&&!t.keys.right&&(this.data.event.walk=!1,this.data.event.stand=!0),(!t.keys.left||!t.keys.right)&&this.data.event.walk&&r.triggers.indexOf("left")===-1&&r.triggers.indexOf("right")===-1,t.keys.right===!1&&this.data.direction.right===!0,t.keys.left===!1&&this.data.direction.left===!0,n},dash:function(e,t){return t},stand:function(e,t){return t},jump:function(e,n){n=this.on.walk.call(this,e,n);var r=this.on.collision.call(this,e,n);return r.triggers.indexOf("top")>-1||this.data.jumpRate>=0?(this.data.event.jump=!1,n=r.event,this.on.fall.call(this,e,n)):(this.data.fallRate=0,n.action="jump",this.data.event.jump=!0,this.data.y+=Math.floor(2*this.data.jumpRate),this.data.jumpRate+=e.world.data.gravity,!t.keys.space),n},fall:function(e,t){t=this.on.walk.call(this,e,t);var n=this.on.collision.call(this,e,t);return n.triggers.indexOf("bottom")>-1?(this.data.event.fall=!1,t=n.event,this.on.land.call(this,e,t)):(this.data.jumpRate=this.data.jumpForce,t.action="fall",this.data.event.fall=!0,this.data.y+=Math.floor(2*this.data.fallRate),this.data.fallRate+=e.world.data.gravity),t},land:function(e,t){return this.data.event.jump=!1,this.data.event.fall=!1,this.data.fallRate=0,this.data.jumpRate=this.data.jumpForce,t},crouch:function(e,t){},destroy:function(t,n){var r=null;this.data.oldFrame.animation!==""&&(r=this.animations[this.data.oldFrame.animation].frames[this.data.oldFrame.index]),this.data.direction.left===!0?(this.data.isFlipped||(n.context.save(),n.context.scale(-1,1),n.context.translate(-e.canvas.width,0),this.data.isFlipped=!0),r!==null&&n.context.clearRect(e.canvas.width-(this.data.oldFrame.x-r.cpx)-r.w-3,this.data.oldFrame.y-r.cpy-3,r.w+3,r.h+3)):(this.data.isFlipped&&(n.context.restore(),this.data.isFlipped=!1),r!==null&&n.context.clearRect(this.data.oldFrame.x-r.cpx-3,this.data.oldFrame.y-r.cpy-3,r.w+3,r.h+3))},animate:function(t,n){var r={action:"stand",move:!1};this.data.event.fall?r=this.on.fall.call(this,t,r):this.data.event.jump?r=this.on.jump.call(this,t,r):this.data.event.walk&&(r=this.on.walk.call(this,t,r)),this.animations[r.action].speed>0&&this.counter++;var i=this.animations[r.action].speed,s=this.counter,o=Math.floor(s/i);if(o>this.animations[r.action].frames.length-1||i===0)o=0,this.counter=0;var u=null;this.data.oldFrame.animation!==""&&(u=this.animations[this.data.oldFrame.animation].frames[this.data.oldFrame.index]);var a=this.data.frameData=this.animations[r.action].frames[o];this.data.direction.left===!0?(this.data.isFlipped||(n.context.save(),n.context.scale(-1,1),n.context.translate(-e.canvas.width,0),this.data.isFlipped=!0),n.context.drawImage(this.image,a.x,a.y,a.w,a.h,e.canvas.width-(this.data.x-a.cpx)-a.w,this.data.y-a.cpy,a.w,a.h)):n.context.drawImage(this.image,a.x,a.y,a.w,a.h,this.data.x-a.cpx,this.data.y-a.cpy,a.w,a.h),this.data.isFlipped&&(n.context.restore(),this.data.isFlipped=!1),this.data.oldFrame.index=o,this.data.oldFrame.animation=r.action,this.data.oldFrame.x=this.data.x,this.data.oldFrame.y=this.data.y},collision:function(t,r){var i={triggers:[],event:r},s=function(e){var t=Math.round(e/32)-1;return t<0&&(t=0),t},o=this.data.x,u=this.data.y,a=this.data.x+this.data.w,f=this.data.y+this.data.h,l=(o+a)/2,c=(u+f)/2,h=n.collide(s(o),s(c));if(o<=0||h.passable===!1)i.triggers.push("left"),i.event.action="stand",this.data.event.walk=!1,this.data.event.stand=!0;h=n.collide(s(a),s(c));if(a>=e.canvas.width||h.passable===!1)i.triggers.push("right"),i.event.action="stand",this.data.event.walk=!1,this.data.event.stand=!0;h=n.collide(s(l),s(u));if(u<=0||h.passable===!1)i.triggers.push("top"),this.data.event.jump&&(this.data.event.jump=!1,this.data.event.fall=!0,i.event.action="fall");h=n.collide(s(l),s(f));if(f>=e.canvas.height||h.passable===!1)i.triggers.push("bottom"),this.data.event.fall&&(this.data.event.jump=!1,this.data.event.fall=!1,i.event.action="land");return i}}})