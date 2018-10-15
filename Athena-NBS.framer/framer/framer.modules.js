require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"nbs":[function(require,module,exports){
var Brick, Container, Listener,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

exports.padding = 15;

exports.situationWidth = 300;

exports.borderradius = 4;

exports.primary = "#00203D";

exports.primaryLight = "#4D6377";

exports.secondary = "#CC0026";

exports.listeners = [];

exports.nodeLinks = [];

exports.NodeLines = (function(superClass) {
  extend(NodeLines, superClass);

  function NodeLines(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      backgroundColor: null,
      width: 2 * exports.padding,
      y: 0,
      animationOptions: {
        time: 0.2,
        curve: Bezier.ease
      },
      html: '<svg> <path d="M0 ' + ("" + this.options.yy) + ' C 20 ' + ("" + this.options.yy) + ' 25 ' + ("" + 30) + ' 45 ' + ("" + 30) + '" stroke="#CC0026" stroke-width="2" fill="none" /> </svg>'
    });
    NodeLines.__super__.constructor.call(this, this.options);
    this.states.collapsed = {
      y: 3 * exports.padding,
      scaleY: 0,
      height: 0,
      opacity: 0
    };
  }

  return NodeLines;

})(Layer);

Listener = (function(superClass) {
  extend(Listener, superClass);

  function Listener(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      backgroundColor: 'transparent',
      borderRadius: exports.borderradius,
      borderWidth: 1,
      borderColor: exports.primary,
      width: exports.situationWidth - 2 * exports.padding,
      height: 40,
      x: exports.padding,
      y: 3 * exports.padding
    });
    Listener.__super__.constructor.call(this, this.options);
    this.label = new TextLayer({
      parent: this,
      text: "Event Listener",
      fontSize: 12,
      color: "black",
      x: exports.padding,
      y: exports.padding
    });
  }

  return Listener;

})(Layer);

Brick = (function(superClass) {
  extend(Brick, superClass);

  function Brick(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      backgroundColor: "#CCC",
      height: 100,
      width: exports.situationWidth,
      x: 0,
      borderWidth: 1,
      borderColor: exports.secondary
    });
    this.label = new TextLayer({
      text: this.options.title,
      fontSize: 12,
      color: "black",
      x: exports.padding,
      y: exports.padding
    });
    Brick.__super__.constructor.call(this, this.options);
    this.label.parent = this;
  }

  return Brick;

})(Layer);

Container = (function(superClass) {
  extend(Container, superClass);

  function Container(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      backgroundColor: null,
      y: 3 * exports.padding,
      animationOptions: {
        time: 0.2,
        curve: Bezier.ease
      }
    });
    Container.__super__.constructor.call(this, this.options);
    this.scrollComp = new ScrollComponent({
      parent: this,
      width: exports.situationWidth,
      backgroundColor: null,
      scrollHorizontal: false,
      overdrag: true
    });
    this.scrollComp.mouseWheelEnabled = true;
    this.states.collapsed = {
      y: 3 * exports.padding,
      scaleY: 0,
      height: 0,
      opacity: 0
    };
  }

  return Container;

})(Layer);

exports.Situation = (function(superClass) {
  extend(Situation, superClass);

  function Situation(options) {
    var bricks, child, i, j, len, ref;
    this.options = options != null ? options : {};
    this.Toggle = bind(this.Toggle, this);
    this.label = new TextLayer({
      text: this.options.l,
      fontSize: 16,
      color: "white",
      x: 3 * exports.padding,
      y: exports.padding
    });
    _.defaults(this.options, {
      backgroundColor: exports.primary,
      height: 3 * exports.padding + exports.borderradius,
      width: exports.situationWidth,
      borderRadius: exports.borderradius,
      x: 2 * exports.padding,
      y: 2 * exports.padding
    });
    Situation.__super__.constructor.call(this, this.options);
    this.label.parent = this;
    this.container = new Container({
      parent: this
    });
    bricks = [];
    ref = this.options.nodes;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      child = ref[i];
      bricks.push(new Brick({
        y: i * 100,
        parent: this.container.scrollComp.content,
        title: child
      }));
    }
    bricks.push(new Brick({
      y: bricks.length * 100,
      parent: this.container.scrollComp.content,
      title: "+ Add new brick"
    }));
    exports.listeners.push(new Listener({
      parent: bricks[bricks.length - 2],
      name: "Listener"
    }));
    this.brick = bricks[bricks.length - 2];
    if (this.container.scrollComp.content.height < 620) {
      this.container.scrollComp.height = this.container.scrollComp.content.height;
    } else {
      this.container.scrollComp.height = 620;
    }
    this.tri = new Layer({
      parent: this,
      width: 20,
      height: 20,
      x: exports.padding,
      y: exports.padding,
      style: {
        "background": "url(images/tri.svg)   no-repeat",
        "background-position": "left center",
        "background-size": "contain"
      },
      animationOptions: {
        time: 0.2,
        curve: Bezier.ease
      }
    });
    this.tri.states.collapsed = {
      rotation: -90
    };
    this.nodeLine = new exports.NodeLines({
      parent: this.options.p,
      x: this.x + this.width - exports.padding,
      y: 2 * exports.padding,
      yy: this.brick.screenFrame.y + this.brick.height / 2 - exports.padding
    });
    exports.nodeLinks.push(this.nodeLine);
    this.tri.onClick(this.Toggle);
    this.onDrag(this.UpdateLinks);
  }

  Situation.prototype.Toggle = function() {
    this.container.stateCycle("collapsed", "default");
    this.tri.stateCycle("collapsed", "default");
    return this.nodeLine.stateCycle("collapsed", "default");
  };

  Situation.prototype.UpdateLinks = function() {
    return this.nodeLine.yy = this.brick.screenFrame.y + this.brick.height / 2;
  };

  return Situation;

})(Layer);

exports.DragHandle = (function(superClass) {
  extend(DragHandle, superClass);

  function DragHandle(options) {
    var that;
    this.options = options != null ? options : {};
    that = this.options.p;
    _.defaults(this.options, {
      width: 20,
      height: 20,
      x: that.x + that.width - 20 - exports.padding,
      y: that.y + exports.padding,
      style: {
        "background": "url(images/draghandle.svg)   no-repeat",
        "background-position": "left center",
        "background-size": "contain"
      }
    });
    DragHandle.__super__.constructor.call(this, this.options);
    this.draggable.enabled = true;
    this.draggable.constraints = {
      x: this.x,
      y: this.y,
      width: 0,
      height: 0
    };
    this.on(Events.Move, function() {
      that.x = this.x - that.width + exports.padding + 20;
      that.y = this.y - exports.padding;
      return that.bringToFront();
    });
  }

  return DragHandle;

})(Layer);

exports.NewSituation = (function(superClass) {
  extend(NewSituation, superClass);

  function NewSituation(options) {
    this.options = options != null ? options : {};
    this.label = new TextLayer({
      text: "New Situation",
      fontSize: 16,
      color: "white",
      x: 3 * exports.padding,
      y: exports.padding
    });
    _.defaults(this.options, {
      backgroundColor: exports.primary,
      height: 3 * exports.padding + exports.borderradius,
      width: exports.situationWidth,
      borderRadius: exports.borderradius,
      x: 2 * exports.padding,
      y: 2 * exports.padding
    });
    NewSituation.__super__.constructor.call(this, this.options);
    this.label.parent = this;
    this.container = new Container({
      parent: this
    });
    this.newBrick = new Brick({
      y: 0,
      parent: this.container,
      title: "+ Add new brick"
    });
  }

  return NewSituation;

})(Layer);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbm9zL1NpdGVzL0F0aGVuYS1OQlMvQXRoZW5hLU5CUy5mcmFtZXIvbW9kdWxlcy9uYnMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzLnBhZGRpbmcgPSAxNVxuZXhwb3J0cy5zaXR1YXRpb25XaWR0aCA9IDMwMFxuZXhwb3J0cy5ib3JkZXJyYWRpdXMgPSA0XG5cbmV4cG9ydHMucHJpbWFyeSA9IFwiIzAwMjAzRFwiXG5leHBvcnRzLnByaW1hcnlMaWdodCA9IFwiIzRENjM3N1wiXG5leHBvcnRzLnNlY29uZGFyeSA9IFwiI0NDMDAyNlwiXG5cbmV4cG9ydHMubGlzdGVuZXJzID0gW11cbmV4cG9ydHMubm9kZUxpbmtzID0gW11cblxuY2xhc3MgZXhwb3J0cy5Ob2RlTGluZXMgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0d2lkdGg6IDIqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAwXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOjAuMlxuXHRcdFx0XHRjdXJ2ZTogQmV6aWVyLmVhc2Vcblx0XHRcdGh0bWw6ICdcblx0XHRcdDxzdmc+XG5cdFx0XHQgIDxwYXRoIGQ9XCJNMCAnKyBcIiN7QG9wdGlvbnMueXl9XCIgKycgQyAyMCAnKyBcIiN7QG9wdGlvbnMueXl9XCIgKycgMjUgJysgXCIjezMwfVwiICsnIDQ1ICcrIFwiI3szMH1cIiArJ1wiIHN0cm9rZT1cIiNDQzAwMjZcIiBzdHJva2Utd2lkdGg9XCIyXCIgZmlsbD1cIm5vbmVcIiAvPlxuXHRcdFx0PC9zdmc+XG5cdFx0XHQnXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QC5zdGF0ZXMuY29sbGFwc2VkPVxuXHRcdFx0eTogMypleHBvcnRzLnBhZGRpbmdcblx0XHRcdHNjYWxlWTogMFxuXHRcdFx0aGVpZ2h0OiAwXG5cdFx0XHRvcGFjaXR5OiAwXG5cblxuXG5jbGFzcyBMaXN0ZW5lciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnXG5cdFx0XHRib3JkZXJSYWRpdXM6IGV4cG9ydHMuYm9yZGVycmFkaXVzXG5cdFx0XHRib3JkZXJXaWR0aDogMVxuXHRcdFx0Ym9yZGVyQ29sb3I6IGV4cG9ydHMucHJpbWFyeVxuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGggLSAyKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0aGVpZ2h0OiA0MFxuXHRcdFx0eDogZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAzKmV4cG9ydHMucGFkZGluZ1xuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0dGV4dDogXCJFdmVudCBMaXN0ZW5lclwiXG5cdFx0XHRmb250U2l6ZTogMTJcblx0XHRcdGNvbG9yOiBcImJsYWNrXCJcblx0XHRcdHg6IGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogZXhwb3J0cy5wYWRkaW5nXG5cblxuY2xhc3MgQnJpY2sgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjQ0NDXCJcblx0XHRcdGhlaWdodDogMTAwXG5cdFx0XHR3aWR0aDogZXhwb3J0cy5zaXR1YXRpb25XaWR0aFxuXHRcdFx0eDogMFxuXHRcdFx0Ym9yZGVyV2lkdGg6IDFcblx0XHRcdGJvcmRlckNvbG9yOiBleHBvcnRzLnNlY29uZGFyeVxuXG5cdFx0QGxhYmVsID0gbmV3IFRleHRMYXllclxuXHRcdFx0dGV4dDogQG9wdGlvbnMudGl0bGVcblx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0Y29sb3I6IFwiYmxhY2tcIlxuXHRcdFx0eDogZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAbGFiZWwucGFyZW50ID0gQFxuXG5cblxuXG5cbmNsYXNzIENvbnRhaW5lciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR5OiAzKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTowLjJcblx0XHRcdFx0Y3VydmU6IEJlemllci5lYXNlXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHNjcm9sbENvbXAgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiBleHBvcnRzLnNpdHVhdGlvbldpZHRoXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRvdmVyZHJhZzogdHJ1ZVxuXG5cdFx0QHNjcm9sbENvbXAubW91c2VXaGVlbEVuYWJsZWQgPSB0cnVlXG5cblxuXHRcdEAuc3RhdGVzLmNvbGxhcHNlZD1cblx0XHRcdHk6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRzY2FsZVk6IDBcblx0XHRcdGhlaWdodDogMFxuXHRcdFx0b3BhY2l0eTogMFxuXG5cblxuXG5cbmNsYXNzIGV4cG9ydHMuU2l0dWF0aW9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IEBvcHRpb25zLmxcblx0XHRcdGZvbnRTaXplOiAxNlxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0eDogMypleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IGV4cG9ydHMucGFkZGluZ1xuXG5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGV4cG9ydHMucHJpbWFyeVxuXHRcdFx0aGVpZ2h0OiAzKmV4cG9ydHMucGFkZGluZyArIGV4cG9ydHMuYm9yZGVycmFkaXVzXG5cdFx0XHR3aWR0aDogZXhwb3J0cy5zaXR1YXRpb25XaWR0aFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiBleHBvcnRzLmJvcmRlcnJhZGl1c1xuXHRcdFx0eDogMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IDIqZXhwb3J0cy5wYWRkaW5nXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGxhYmVsLnBhcmVudCA9IEBcblxuXHRcdEBjb250YWluZXIgPSBuZXcgQ29udGFpbmVyXG5cdFx0XHRwYXJlbnQ6IEBcblxuXHRcdGJyaWNrcyA9IFtdXG5cdFx0Zm9yIGNoaWxkLCBpIGluIEBvcHRpb25zLm5vZGVzXG5cdFx0XHRicmlja3MucHVzaCBuZXcgQnJpY2tcblx0XHRcdFx0eTogaSoxMDBcblx0XHRcdFx0cGFyZW50OiBAY29udGFpbmVyLnNjcm9sbENvbXAuY29udGVudFxuXHRcdFx0XHR0aXRsZTogY2hpbGRcblxuXHRcdGJyaWNrcy5wdXNoIG5ldyBCcmlja1xuXHRcdFx0eTogYnJpY2tzLmxlbmd0aCoxMDBcblx0XHRcdHBhcmVudDogQGNvbnRhaW5lci5zY3JvbGxDb21wLmNvbnRlbnRcblx0XHRcdHRpdGxlOiBcIisgQWRkIG5ldyBicmlja1wiXG5cblx0XHRleHBvcnRzLmxpc3RlbmVycy5wdXNoIG5ldyBMaXN0ZW5lclxuXHRcdFx0cGFyZW50OiBicmlja3NbYnJpY2tzLmxlbmd0aC0yXVxuXHRcdFx0bmFtZTogXCJMaXN0ZW5lclwiXG5cblx0XHRAYnJpY2sgPSBicmlja3NbYnJpY2tzLmxlbmd0aC0yXVxuXG5cdFx0aWYgKEBjb250YWluZXIuc2Nyb2xsQ29tcC5jb250ZW50LmhlaWdodCA8IDYyMClcblx0XHRcdEBjb250YWluZXIuc2Nyb2xsQ29tcC5oZWlnaHQgPSBAY29udGFpbmVyLnNjcm9sbENvbXAuY29udGVudC5oZWlnaHRcblx0XHRlbHNlXG5cdFx0XHRAY29udGFpbmVyLnNjcm9sbENvbXAuaGVpZ2h0ID0gNjIwXG5cblx0XHRAdHJpID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiAyMFxuXHRcdFx0aGVpZ2h0OiAyMFxuXHRcdFx0eDpleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdFwiYmFja2dyb3VuZFwiIDogXCJ1cmwoaW1hZ2VzL3RyaS5zdmcpICAgbm8tcmVwZWF0XCJcblx0XHRcdFx0XCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCI6XCJsZWZ0IGNlbnRlclwiXG5cdFx0XHRcdFwiYmFja2dyb3VuZC1zaXplXCIgOiBcImNvbnRhaW5cIlxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTowLjJcblx0XHRcdFx0Y3VydmU6IEJlemllci5lYXNlXG5cblx0XHRAdHJpLnN0YXRlcy5jb2xsYXBzZWQ9XG5cdFx0XHRyb3RhdGlvbjogLTkwXG5cblxuXHRcdEBub2RlTGluZSA9IG5ldyBleHBvcnRzLk5vZGVMaW5lc1xuXHRcdFx0cGFyZW50IDogQG9wdGlvbnMucFxuXHRcdFx0eDogQC54ICsgQC53aWR0aCAtIGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdHl5OiBAYnJpY2suc2NyZWVuRnJhbWUueSArIEBicmljay5oZWlnaHQvMiAtIGV4cG9ydHMucGFkZGluZ1xuXG5cdFx0ZXhwb3J0cy5ub2RlTGlua3MucHVzaCBAbm9kZUxpbmVcblxuXHRcdEB0cmkub25DbGljayBAVG9nZ2xlXG5cdFx0QC5vbkRyYWcgQFVwZGF0ZUxpbmtzXG5cblx0VG9nZ2xlOiA9PlxuXHRcdEBjb250YWluZXIuc3RhdGVDeWNsZSBcImNvbGxhcHNlZFwiLCBcImRlZmF1bHRcIlxuXHRcdEB0cmkuc3RhdGVDeWNsZSBcImNvbGxhcHNlZFwiLCBcImRlZmF1bHRcIlxuXHRcdEBub2RlTGluZS5zdGF0ZUN5Y2xlIFwiY29sbGFwc2VkXCIsIFwiZGVmYXVsdFwiXG5cblxuXHRVcGRhdGVMaW5rczogLT5cblx0XHRAbm9kZUxpbmUueXkgPSBAYnJpY2suc2NyZWVuRnJhbWUueSArIEBicmljay5oZWlnaHQvMlxuXG5cblxuY2xhc3MgZXhwb3J0cy5EcmFnSGFuZGxlIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdHRoYXQgPSBAb3B0aW9ucy5wXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0d2lkdGg6IDIwXG5cdFx0XHRoZWlnaHQ6IDIwXG5cdFx0XHR4OiB0aGF0LnggKyB0aGF0LndpZHRoIC0gMjAgLSBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IHRoYXQueSArIGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdFwiYmFja2dyb3VuZFwiIDogXCJ1cmwoaW1hZ2VzL2RyYWdoYW5kbGUuc3ZnKSAgIG5vLXJlcGVhdFwiXG5cdFx0XHRcdFwiYmFja2dyb3VuZC1wb3NpdGlvblwiOlwibGVmdCBjZW50ZXJcIlxuXHRcdFx0XHRcImJhY2tncm91bmQtc2l6ZVwiIDogXCJjb250YWluXCJcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QC5kcmFnZ2FibGUuZW5hYmxlZCA9IHRydWVcblx0XHRALmRyYWdnYWJsZS5jb25zdHJhaW50cyA9IHtcblx0XHRcdHg6IEAueFxuXHRcdFx0eTogQC55XG5cdFx0XHR3aWR0aDogMFxuXHRcdFx0aGVpZ2h0OiAwXG5cdFx0fVxuXHRcdEAub24gRXZlbnRzLk1vdmUsIC0+XG5cdFx0XHR0aGF0LnggPSBALnggLSB0aGF0LndpZHRoICsgZXhwb3J0cy5wYWRkaW5nICsgMjBcblx0XHRcdHRoYXQueSA9IEAueSAtIGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0dGhhdC5icmluZ1RvRnJvbnQoKVxuXG5cblxuXG5jbGFzcyBleHBvcnRzLk5ld1NpdHVhdGlvbiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRAbGFiZWwgPSBuZXcgVGV4dExheWVyXG5cdFx0XHR0ZXh0OiBcIk5ldyBTaXR1YXRpb25cIlxuXHRcdFx0Zm9udFNpemU6IDE2XG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHR4OiAzKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogZXhwb3J0cy5wYWRkaW5nXG5cblxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogZXhwb3J0cy5wcmltYXJ5XG5cdFx0XHRoZWlnaHQ6IDMqZXhwb3J0cy5wYWRkaW5nICsgZXhwb3J0cy5ib3JkZXJyYWRpdXNcblx0XHRcdHdpZHRoOiBleHBvcnRzLnNpdHVhdGlvbldpZHRoXG5cdFx0XHRib3JkZXJSYWRpdXM6IGV4cG9ydHMuYm9yZGVycmFkaXVzXG5cdFx0XHR4OiAyKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogMipleHBvcnRzLnBhZGRpbmdcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAbGFiZWwucGFyZW50ID0gQFxuXG5cdFx0QGNvbnRhaW5lciA9IG5ldyBDb250YWluZXJcblx0XHRcdHBhcmVudDogQFxuXG5cdFx0QG5ld0JyaWNrID0gbmV3IEJyaWNrXG5cdFx0XHR5OiAwXG5cdFx0XHRwYXJlbnQ6IEBjb250YWluZXJcblx0XHRcdHRpdGxlOiBcIisgQWRkIG5ldyBicmlja1wiXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUNBQTtBREFBLElBQUEsMEJBQUE7RUFBQTs7OztBQUFBLE9BQU8sQ0FBQyxPQUFSLEdBQWtCOztBQUNsQixPQUFPLENBQUMsY0FBUixHQUF5Qjs7QUFDekIsT0FBTyxDQUFDLFlBQVIsR0FBdUI7O0FBRXZCLE9BQU8sQ0FBQyxPQUFSLEdBQWtCOztBQUNsQixPQUFPLENBQUMsWUFBUixHQUF1Qjs7QUFDdkIsT0FBTyxDQUFDLFNBQVIsR0FBb0I7O0FBRXBCLE9BQU8sQ0FBQyxTQUFSLEdBQW9COztBQUNwQixPQUFPLENBQUMsU0FBUixHQUFvQjs7QUFFZCxPQUFPLENBQUM7OztFQUNBLG1CQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUztJQUV0QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxlQUFBLEVBQWlCLElBQWpCO01BQ0EsS0FBQSxFQUFPLENBQUEsR0FBRSxPQUFPLENBQUMsT0FEakI7TUFFQSxDQUFBLEVBQUcsQ0FGSDtNQUdBLGdCQUFBLEVBQ0M7UUFB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
