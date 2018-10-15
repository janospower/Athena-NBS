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
  }

  Situation.prototype.Toggle = function() {
    this.container.stateCycle("collapsed", "default");
    this.tri.stateCycle("collapsed", "default");
    return this.nodeLine.stateCycle("collapsed", "default");
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
      var xx, yy;
      that.x = this.x - that.width + exports.padding + 20;
      that.y = this.y - exports.padding;
      that.bringToFront();
      yy = that.brick.screenFrame.y + that.brick.height / 2 - exports.padding;
      xx = that.brick.screenFrame.x + that.brick.width;
      return that.nodeLine.html = '<svg> <path d="M0 ' + ("" + yy) + ' C 20 ' + ("" + yy) + ' 25 ' + ("" + 30) + ' 45 ' + ("" + 30) + '" stroke="#CC0026" stroke-width="2" fill="none" /> </svg>';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbm9zL1NpdGVzL0F0aGVuYS1OQlMvQXRoZW5hLU5CUy5mcmFtZXIvbW9kdWxlcy9uYnMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzLnBhZGRpbmcgPSAxNVxuZXhwb3J0cy5zaXR1YXRpb25XaWR0aCA9IDMwMFxuZXhwb3J0cy5ib3JkZXJyYWRpdXMgPSA0XG5cbmV4cG9ydHMucHJpbWFyeSA9IFwiIzAwMjAzRFwiXG5leHBvcnRzLnByaW1hcnlMaWdodCA9IFwiIzRENjM3N1wiXG5leHBvcnRzLnNlY29uZGFyeSA9IFwiI0NDMDAyNlwiXG5cbmV4cG9ydHMubGlzdGVuZXJzID0gW11cbmV4cG9ydHMubm9kZUxpbmtzID0gW11cblxuY2xhc3MgZXhwb3J0cy5Ob2RlTGluZXMgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0d2lkdGg6IDIqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAwXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOjAuMlxuXHRcdFx0XHRjdXJ2ZTogQmV6aWVyLmVhc2Vcblx0XHRcdGh0bWw6ICdcblx0XHRcdDxzdmc+XG5cdFx0XHQgIDxwYXRoIGQ9XCJNMCAnKyBcIiN7QG9wdGlvbnMueXl9XCIgKycgQyAyMCAnKyBcIiN7QG9wdGlvbnMueXl9XCIgKycgMjUgJysgXCIjezMwfVwiICsnIDQ1ICcrIFwiI3szMH1cIiArJ1wiIHN0cm9rZT1cIiNDQzAwMjZcIiBzdHJva2Utd2lkdGg9XCIyXCIgZmlsbD1cIm5vbmVcIiAvPlxuXHRcdFx0PC9zdmc+XG5cdFx0XHQnXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QC5zdGF0ZXMuY29sbGFwc2VkPVxuXHRcdFx0eTogMypleHBvcnRzLnBhZGRpbmdcblx0XHRcdHNjYWxlWTogMFxuXHRcdFx0aGVpZ2h0OiAwXG5cdFx0XHRvcGFjaXR5OiAwXG5cblxuXG5jbGFzcyBMaXN0ZW5lciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnXG5cdFx0XHRib3JkZXJSYWRpdXM6IGV4cG9ydHMuYm9yZGVycmFkaXVzXG5cdFx0XHRib3JkZXJXaWR0aDogMVxuXHRcdFx0Ym9yZGVyQ29sb3I6IGV4cG9ydHMucHJpbWFyeVxuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGggLSAyKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0aGVpZ2h0OiA0MFxuXHRcdFx0eDogZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAzKmV4cG9ydHMucGFkZGluZ1xuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0dGV4dDogXCJFdmVudCBMaXN0ZW5lclwiXG5cdFx0XHRmb250U2l6ZTogMTJcblx0XHRcdGNvbG9yOiBcImJsYWNrXCJcblx0XHRcdHg6IGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogZXhwb3J0cy5wYWRkaW5nXG5cblxuY2xhc3MgQnJpY2sgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjQ0NDXCJcblx0XHRcdGhlaWdodDogMTAwXG5cdFx0XHR3aWR0aDogZXhwb3J0cy5zaXR1YXRpb25XaWR0aFxuXHRcdFx0eDogMFxuXHRcdFx0Ym9yZGVyV2lkdGg6IDFcblx0XHRcdGJvcmRlckNvbG9yOiBleHBvcnRzLnNlY29uZGFyeVxuXG5cdFx0QGxhYmVsID0gbmV3IFRleHRMYXllclxuXHRcdFx0dGV4dDogQG9wdGlvbnMudGl0bGVcblx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0Y29sb3I6IFwiYmxhY2tcIlxuXHRcdFx0eDogZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAbGFiZWwucGFyZW50ID0gQFxuXG5cblxuXG5cbmNsYXNzIENvbnRhaW5lciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR5OiAzKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTowLjJcblx0XHRcdFx0Y3VydmU6IEJlemllci5lYXNlXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHNjcm9sbENvbXAgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiBleHBvcnRzLnNpdHVhdGlvbldpZHRoXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRvdmVyZHJhZzogdHJ1ZVxuXG5cdFx0QHNjcm9sbENvbXAubW91c2VXaGVlbEVuYWJsZWQgPSB0cnVlXG5cblxuXHRcdEAuc3RhdGVzLmNvbGxhcHNlZD1cblx0XHRcdHk6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRzY2FsZVk6IDBcblx0XHRcdGhlaWdodDogMFxuXHRcdFx0b3BhY2l0eTogMFxuXG5cblxuXG5cbmNsYXNzIGV4cG9ydHMuU2l0dWF0aW9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IEBvcHRpb25zLmxcblx0XHRcdGZvbnRTaXplOiAxNlxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0eDogMypleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IGV4cG9ydHMucGFkZGluZ1xuXG5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGV4cG9ydHMucHJpbWFyeVxuXHRcdFx0aGVpZ2h0OiAzKmV4cG9ydHMucGFkZGluZyArIGV4cG9ydHMuYm9yZGVycmFkaXVzXG5cdFx0XHR3aWR0aDogZXhwb3J0cy5zaXR1YXRpb25XaWR0aFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiBleHBvcnRzLmJvcmRlcnJhZGl1c1xuXHRcdFx0eDogMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IDIqZXhwb3J0cy5wYWRkaW5nXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGxhYmVsLnBhcmVudCA9IEBcblxuXHRcdEBjb250YWluZXIgPSBuZXcgQ29udGFpbmVyXG5cdFx0XHRwYXJlbnQ6IEBcblxuXHRcdGJyaWNrcyA9IFtdXG5cdFx0Zm9yIGNoaWxkLCBpIGluIEBvcHRpb25zLm5vZGVzXG5cdFx0XHRicmlja3MucHVzaCBuZXcgQnJpY2tcblx0XHRcdFx0eTogaSoxMDBcblx0XHRcdFx0cGFyZW50OiBAY29udGFpbmVyLnNjcm9sbENvbXAuY29udGVudFxuXHRcdFx0XHR0aXRsZTogY2hpbGRcblxuXHRcdGJyaWNrcy5wdXNoIG5ldyBCcmlja1xuXHRcdFx0eTogYnJpY2tzLmxlbmd0aCoxMDBcblx0XHRcdHBhcmVudDogQGNvbnRhaW5lci5zY3JvbGxDb21wLmNvbnRlbnRcblx0XHRcdHRpdGxlOiBcIisgQWRkIG5ldyBicmlja1wiXG5cblx0XHRleHBvcnRzLmxpc3RlbmVycy5wdXNoIG5ldyBMaXN0ZW5lclxuXHRcdFx0cGFyZW50OiBicmlja3NbYnJpY2tzLmxlbmd0aC0yXVxuXHRcdFx0bmFtZTogXCJMaXN0ZW5lclwiXG5cblx0XHRAYnJpY2sgPSBicmlja3NbYnJpY2tzLmxlbmd0aC0yXVxuXG5cdFx0aWYgKEBjb250YWluZXIuc2Nyb2xsQ29tcC5jb250ZW50LmhlaWdodCA8IDYyMClcblx0XHRcdEBjb250YWluZXIuc2Nyb2xsQ29tcC5oZWlnaHQgPSBAY29udGFpbmVyLnNjcm9sbENvbXAuY29udGVudC5oZWlnaHRcblx0XHRlbHNlXG5cdFx0XHRAY29udGFpbmVyLnNjcm9sbENvbXAuaGVpZ2h0ID0gNjIwXG5cblx0XHRAdHJpID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiAyMFxuXHRcdFx0aGVpZ2h0OiAyMFxuXHRcdFx0eDpleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdFwiYmFja2dyb3VuZFwiIDogXCJ1cmwoaW1hZ2VzL3RyaS5zdmcpICAgbm8tcmVwZWF0XCJcblx0XHRcdFx0XCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCI6XCJsZWZ0IGNlbnRlclwiXG5cdFx0XHRcdFwiYmFja2dyb3VuZC1zaXplXCIgOiBcImNvbnRhaW5cIlxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTowLjJcblx0XHRcdFx0Y3VydmU6IEJlemllci5lYXNlXG5cblx0XHRAdHJpLnN0YXRlcy5jb2xsYXBzZWQ9XG5cdFx0XHRyb3RhdGlvbjogLTkwXG5cblxuXHRcdEBub2RlTGluZSA9IG5ldyBleHBvcnRzLk5vZGVMaW5lc1xuXHRcdFx0cGFyZW50IDogQG9wdGlvbnMucFxuXHRcdFx0eDogQC54ICsgQC53aWR0aCAtIGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdHl5OiBAYnJpY2suc2NyZWVuRnJhbWUueSArIEBicmljay5oZWlnaHQvMiAtIGV4cG9ydHMucGFkZGluZ1xuXG5cdFx0ZXhwb3J0cy5ub2RlTGlua3MucHVzaCBAbm9kZUxpbmVcblxuXHRcdEB0cmkub25DbGljayBAVG9nZ2xlXG5cblx0VG9nZ2xlOiA9PlxuXHRcdEBjb250YWluZXIuc3RhdGVDeWNsZSBcImNvbGxhcHNlZFwiLCBcImRlZmF1bHRcIlxuXHRcdEB0cmkuc3RhdGVDeWNsZSBcImNvbGxhcHNlZFwiLCBcImRlZmF1bHRcIlxuXHRcdEBub2RlTGluZS5zdGF0ZUN5Y2xlIFwiY29sbGFwc2VkXCIsIFwiZGVmYXVsdFwiXG5cblxuXG5cblxuXG5jbGFzcyBleHBvcnRzLkRyYWdIYW5kbGUgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0dGhhdCA9IEBvcHRpb25zLnBcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR3aWR0aDogMjBcblx0XHRcdGhlaWdodDogMjBcblx0XHRcdHg6IHRoYXQueCArIHRoYXQud2lkdGggLSAyMCAtIGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogdGhhdC55ICsgZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0XCJiYWNrZ3JvdW5kXCIgOiBcInVybChpbWFnZXMvZHJhZ2hhbmRsZS5zdmcpICAgbm8tcmVwZWF0XCJcblx0XHRcdFx0XCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCI6XCJsZWZ0IGNlbnRlclwiXG5cdFx0XHRcdFwiYmFja2dyb3VuZC1zaXplXCIgOiBcImNvbnRhaW5cIlxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRALmRyYWdnYWJsZS5lbmFibGVkID0gdHJ1ZVxuXHRcdEAuZHJhZ2dhYmxlLmNvbnN0cmFpbnRzID0ge1xuXHRcdFx0eDogQC54XG5cdFx0XHR5OiBALnlcblx0XHRcdHdpZHRoOiAwXG5cdFx0XHRoZWlnaHQ6IDBcblx0XHR9XG5cdFx0QC5vbiBFdmVudHMuTW92ZSwgLT5cblx0XHRcdHRoYXQueCA9IEAueCAtIHRoYXQud2lkdGggKyBleHBvcnRzLnBhZGRpbmcgKyAyMFxuXHRcdFx0dGhhdC55ID0gQC55IC0gZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR0aGF0LmJyaW5nVG9Gcm9udCgpXG5cdFx0XHR5eSA9IHRoYXQuYnJpY2suc2NyZWVuRnJhbWUueSArIHRoYXQuYnJpY2suaGVpZ2h0LzIgLSBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHh4ID0gdGhhdC5icmljay5zY3JlZW5GcmFtZS54ICsgdGhhdC5icmljay53aWR0aFxuXHRcdFx0dGhhdC5ub2RlTGluZS5odG1sID0gJ1xuXHRcdFx0PHN2Zz5cblx0XHRcdCAgPHBhdGggZD1cIk0wICcrIFwiI3t5eX1cIiArJyBDIDIwICcrIFwiI3t5eX1cIiArJyAyNSAnKyBcIiN7MzB9XCIgKycgNDUgJysgXCIjezMwfVwiICsnXCIgc3Ryb2tlPVwiI0NDMDAyNlwiIHN0cm9rZS13aWR0aD1cIjJcIiBmaWxsPVwibm9uZVwiIC8+XG5cdFx0XHQ8L3N2Zz5cblx0XHRcdCdcblxuXG5cblxuY2xhc3MgZXhwb3J0cy5OZXdTaXR1YXRpb24gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0QGxhYmVsID0gbmV3IFRleHRMYXllclxuXHRcdFx0dGV4dDogXCJOZXcgU2l0dWF0aW9uXCJcblx0XHRcdGZvbnRTaXplOiAxNlxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0eDogMypleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IGV4cG9ydHMucGFkZGluZ1xuXG5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGV4cG9ydHMucHJpbWFyeVxuXHRcdFx0aGVpZ2h0OiAzKmV4cG9ydHMucGFkZGluZyArIGV4cG9ydHMuYm9yZGVycmFkaXVzXG5cdFx0XHR3aWR0aDogZXhwb3J0cy5zaXR1YXRpb25XaWR0aFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiBleHBvcnRzLmJvcmRlcnJhZGl1c1xuXHRcdFx0eDogMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IDIqZXhwb3J0cy5wYWRkaW5nXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGxhYmVsLnBhcmVudCA9IEBcblxuXHRcdEBjb250YWluZXIgPSBuZXcgQ29udGFpbmVyXG5cdFx0XHRwYXJlbnQ6IEBcblxuXHRcdEBuZXdCcmljayA9IG5ldyBCcmlja1xuXHRcdFx0eTogMFxuXHRcdFx0cGFyZW50OiBAY29udGFpbmVyXG5cdFx0XHR0aXRsZTogXCIrIEFkZCBuZXcgYnJpY2tcIlxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFDQUE7QURBQSxJQUFBLDBCQUFBO0VBQUE7Ozs7QUFBQSxPQUFPLENBQUMsT0FBUixHQUFrQjs7QUFDbEIsT0FBTyxDQUFDLGNBQVIsR0FBeUI7O0FBQ3pCLE9BQU8sQ0FBQyxZQUFSLEdBQXVCOztBQUV2QixPQUFPLENBQUMsT0FBUixHQUFrQjs7QUFDbEIsT0FBTyxDQUFDLFlBQVIsR0FBdUI7O0FBQ3ZCLE9BQU8sQ0FBQyxTQUFSLEdBQW9COztBQUVwQixPQUFPLENB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
