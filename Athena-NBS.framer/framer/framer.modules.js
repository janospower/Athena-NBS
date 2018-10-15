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
      text: "Event Name",
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
      parent: this,
      x: this.width - exports.padding,
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
        "background": "url(images/tri.svg)   no-repeat",
        "background-position": "left center",
        "background-size": "contain"
      }
    });
    DragHandle.__super__.constructor.call(this, this.options);
    print(that.x);
    this.draggable.enabled = true;
    this.draggable.constraints = {
      x: this.x,
      y: this.y,
      width: 0,
      height: 0
    };
    this.on(Events.Move, function() {
      that.x = this.x - that.width + exports.padding + 20;
      return that.y = this.y - exports.padding;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbm9zL1NpdGVzL0F0aGVuYS1OQlMvQXRoZW5hLU5CUy5mcmFtZXIvbW9kdWxlcy9uYnMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzLnBhZGRpbmcgPSAxNVxuZXhwb3J0cy5zaXR1YXRpb25XaWR0aCA9IDMwMFxuZXhwb3J0cy5ib3JkZXJyYWRpdXMgPSA0XG5cbmV4cG9ydHMucHJpbWFyeSA9IFwiIzAwMjAzRFwiXG5leHBvcnRzLnByaW1hcnlMaWdodCA9IFwiIzRENjM3N1wiXG5leHBvcnRzLnNlY29uZGFyeSA9IFwiI0NDMDAyNlwiXG5cbmV4cG9ydHMubGlzdGVuZXJzID0gW11cbmV4cG9ydHMubm9kZUxpbmtzID0gW11cblxuY2xhc3MgZXhwb3J0cy5Ob2RlTGluZXMgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0d2lkdGg6IDIqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAwXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOjAuMlxuXHRcdFx0XHRjdXJ2ZTogQmV6aWVyLmVhc2Vcblx0XHRcdGh0bWw6ICdcblx0XHRcdDxzdmc+XG5cdFx0XHQgIDxwYXRoIGQ9XCJNMCAnKyBcIiN7QG9wdGlvbnMueXl9XCIgKycgQyAyMCAnKyBcIiN7QG9wdGlvbnMueXl9XCIgKycgMjUgJysgXCIjezMwfVwiICsnIDQ1ICcrIFwiI3szMH1cIiArJ1wiIHN0cm9rZT1cIiNDQzAwMjZcIiBzdHJva2Utd2lkdGg9XCIyXCIgZmlsbD1cIm5vbmVcIiAvPlxuXHRcdFx0PC9zdmc+XG5cdFx0XHQnXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QC5zdGF0ZXMuY29sbGFwc2VkPVxuXHRcdFx0eTogMypleHBvcnRzLnBhZGRpbmdcblx0XHRcdHNjYWxlWTogMFxuXHRcdFx0aGVpZ2h0OiAwXG5cdFx0XHRvcGFjaXR5OiAwXG5cblxuXG5jbGFzcyBMaXN0ZW5lciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnXG5cdFx0XHRib3JkZXJSYWRpdXM6IGV4cG9ydHMuYm9yZGVycmFkaXVzXG5cdFx0XHRib3JkZXJXaWR0aDogMVxuXHRcdFx0Ym9yZGVyQ29sb3I6IGV4cG9ydHMucHJpbWFyeVxuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGggLSAyKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0aGVpZ2h0OiA0MFxuXHRcdFx0eDogZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAzKmV4cG9ydHMucGFkZGluZ1xuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0dGV4dDogXCJFdmVudCBMaXN0ZW5lclwiXG5cdFx0XHRmb250U2l6ZTogMTJcblx0XHRcdGNvbG9yOiBcImJsYWNrXCJcblx0XHRcdHg6IGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogZXhwb3J0cy5wYWRkaW5nXG5cblxuY2xhc3MgQnJpY2sgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjQ0NDXCJcblx0XHRcdGhlaWdodDogMTAwXG5cdFx0XHR3aWR0aDogZXhwb3J0cy5zaXR1YXRpb25XaWR0aFxuXHRcdFx0eDogMFxuXHRcdFx0Ym9yZGVyV2lkdGg6IDFcblx0XHRcdGJvcmRlckNvbG9yOiBleHBvcnRzLnNlY29uZGFyeVxuXG5cdFx0QGxhYmVsID0gbmV3IFRleHRMYXllclxuXHRcdFx0dGV4dDogQG9wdGlvbnMudGl0bGVcblx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0Y29sb3I6IFwiYmxhY2tcIlxuXHRcdFx0eDogZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAbGFiZWwucGFyZW50ID0gQFxuXG5cblxuXG5cbmNsYXNzIENvbnRhaW5lciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR5OiAzKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTowLjJcblx0XHRcdFx0Y3VydmU6IEJlemllci5lYXNlXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHNjcm9sbENvbXAgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiBleHBvcnRzLnNpdHVhdGlvbldpZHRoXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRvdmVyZHJhZzogdHJ1ZVxuXG5cdFx0QHNjcm9sbENvbXAubW91c2VXaGVlbEVuYWJsZWQgPSB0cnVlXG5cblxuXHRcdEAuc3RhdGVzLmNvbGxhcHNlZD1cblx0XHRcdHk6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRzY2FsZVk6IDBcblx0XHRcdGhlaWdodDogMFxuXHRcdFx0b3BhY2l0eTogMFxuXG5cblxuXG5cbmNsYXNzIGV4cG9ydHMuU2l0dWF0aW9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IFwiRXZlbnQgTmFtZVwiXG5cdFx0XHRmb250U2l6ZTogMTZcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdHg6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblxuXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBleHBvcnRzLnByaW1hcnlcblx0XHRcdGhlaWdodDogMypleHBvcnRzLnBhZGRpbmcgKyBleHBvcnRzLmJvcmRlcnJhZGl1c1xuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGhcblx0XHRcdGJvcmRlclJhZGl1czogZXhwb3J0cy5ib3JkZXJyYWRpdXNcblx0XHRcdHg6IDIqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAyKmV4cG9ydHMucGFkZGluZ1xuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBsYWJlbC5wYXJlbnQgPSBAXG5cblx0XHRAY29udGFpbmVyID0gbmV3IENvbnRhaW5lclxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHRicmlja3MgPSBbXVxuXHRcdGZvciBjaGlsZCwgaSBpbiBAb3B0aW9ucy5ub2Rlc1xuXHRcdFx0YnJpY2tzLnB1c2ggbmV3IEJyaWNrXG5cdFx0XHRcdHk6IGkqMTAwXG5cdFx0XHRcdHBhcmVudDogQGNvbnRhaW5lci5zY3JvbGxDb21wLmNvbnRlbnRcblx0XHRcdFx0dGl0bGU6IGNoaWxkXG5cblx0XHRicmlja3MucHVzaCBuZXcgQnJpY2tcblx0XHRcdHk6IGJyaWNrcy5sZW5ndGgqMTAwXG5cdFx0XHRwYXJlbnQ6IEBjb250YWluZXIuc2Nyb2xsQ29tcC5jb250ZW50XG5cdFx0XHR0aXRsZTogXCIrIEFkZCBuZXcgYnJpY2tcIlxuXG5cdFx0ZXhwb3J0cy5saXN0ZW5lcnMucHVzaCBuZXcgTGlzdGVuZXJcblx0XHRcdHBhcmVudDogYnJpY2tzW2JyaWNrcy5sZW5ndGgtMl1cblx0XHRcdG5hbWU6IFwiTGlzdGVuZXJcIlxuXG5cdFx0QGJyaWNrID0gYnJpY2tzW2JyaWNrcy5sZW5ndGgtMl1cblxuXHRcdGlmIChAY29udGFpbmVyLnNjcm9sbENvbXAuY29udGVudC5oZWlnaHQgPCA2MjApXG5cdFx0XHRAY29udGFpbmVyLnNjcm9sbENvbXAuaGVpZ2h0ID0gQGNvbnRhaW5lci5zY3JvbGxDb21wLmNvbnRlbnQuaGVpZ2h0XG5cdFx0ZWxzZVxuXHRcdFx0QGNvbnRhaW5lci5zY3JvbGxDb21wLmhlaWdodCA9IDYyMFxuXG5cdFx0QHRyaSA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR3aWR0aDogMjBcblx0XHRcdGhlaWdodDogMjBcblx0XHRcdHg6ZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHN0eWxlOlxuXHRcdFx0XHRcImJhY2tncm91bmRcIiA6IFwidXJsKGltYWdlcy90cmkuc3ZnKSAgIG5vLXJlcGVhdFwiXG5cdFx0XHRcdFwiYmFja2dyb3VuZC1wb3NpdGlvblwiOlwibGVmdCBjZW50ZXJcIlxuXHRcdFx0XHRcImJhY2tncm91bmQtc2l6ZVwiIDogXCJjb250YWluXCJcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6MC4yXG5cdFx0XHRcdGN1cnZlOiBCZXppZXIuZWFzZVxuXG5cdFx0QHRyaS5zdGF0ZXMuY29sbGFwc2VkPVxuXHRcdFx0cm90YXRpb246IC05MFxuXG5cblx0XHRAbm9kZUxpbmUgPSBuZXcgZXhwb3J0cy5Ob2RlTGluZXNcblx0XHRcdHBhcmVudCA6IEBcblx0XHRcdHg6IEAud2lkdGggLSBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHl5OiBAYnJpY2suc2NyZWVuRnJhbWUueSArIEBicmljay5oZWlnaHQvMiAtIGV4cG9ydHMucGFkZGluZ1xuXG5cdFx0ZXhwb3J0cy5ub2RlTGlua3MucHVzaCBAbm9kZUxpbmVcblxuXHRcdEB0cmkub25DbGljayBAVG9nZ2xlXG5cdFx0QC5vbkRyYWcgQFVwZGF0ZUxpbmtzXG5cblx0VG9nZ2xlOiA9PlxuXHRcdEBjb250YWluZXIuc3RhdGVDeWNsZSBcImNvbGxhcHNlZFwiLCBcImRlZmF1bHRcIlxuXHRcdEB0cmkuc3RhdGVDeWNsZSBcImNvbGxhcHNlZFwiLCBcImRlZmF1bHRcIlxuXHRcdEBub2RlTGluZS5zdGF0ZUN5Y2xlIFwiY29sbGFwc2VkXCIsIFwiZGVmYXVsdFwiXG5cblxuXHRVcGRhdGVMaW5rczogLT5cblx0XHRAbm9kZUxpbmUueXkgPSBAYnJpY2suc2NyZWVuRnJhbWUueSArIEBicmljay5oZWlnaHQvMlxuXG5cblxuY2xhc3MgZXhwb3J0cy5EcmFnSGFuZGxlIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdHRoYXQgPSBAb3B0aW9ucy5wXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0d2lkdGg6IDIwXG5cdFx0XHRoZWlnaHQ6IDIwXG5cdFx0XHR4OiB0aGF0LnggKyB0aGF0LndpZHRoIC0gMjAgLSBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IHRoYXQueSArIGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdFwiYmFja2dyb3VuZFwiIDogXCJ1cmwoaW1hZ2VzL3RyaS5zdmcpICAgbm8tcmVwZWF0XCJcblx0XHRcdFx0XCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCI6XCJsZWZ0IGNlbnRlclwiXG5cdFx0XHRcdFwiYmFja2dyb3VuZC1zaXplXCIgOiBcImNvbnRhaW5cIlxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRwcmludCB0aGF0Lnhcblx0XHRALmRyYWdnYWJsZS5lbmFibGVkID0gdHJ1ZVxuXHRcdEAuZHJhZ2dhYmxlLmNvbnN0cmFpbnRzID0ge1xuXHRcdFx0eDogQC54XG5cdFx0XHR5OiBALnlcblx0XHRcdHdpZHRoOiAwXG5cdFx0XHRoZWlnaHQ6IDBcblx0XHR9XG5cdFx0QC5vbiBFdmVudHMuTW92ZSwgLT5cblx0XHRcdHRoYXQueCA9IEAueCAtIHRoYXQud2lkdGggKyBleHBvcnRzLnBhZGRpbmcgKyAyMFxuXHRcdFx0dGhhdC55ID0gQC55IC0gZXhwb3J0cy5wYWRkaW5nXG5cblxuXG5cbmNsYXNzIGV4cG9ydHMuTmV3U2l0dWF0aW9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IFwiTmV3IFNpdHVhdGlvblwiXG5cdFx0XHRmb250U2l6ZTogMTZcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdHg6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblxuXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBleHBvcnRzLnByaW1hcnlcblx0XHRcdGhlaWdodDogMypleHBvcnRzLnBhZGRpbmcgKyBleHBvcnRzLmJvcmRlcnJhZGl1c1xuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGhcblx0XHRcdGJvcmRlclJhZGl1czogZXhwb3J0cy5ib3JkZXJyYWRpdXNcblx0XHRcdHg6IDIqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAyKmV4cG9ydHMucGFkZGluZ1xuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBsYWJlbC5wYXJlbnQgPSBAXG5cblx0XHRAY29udGFpbmVyID0gbmV3IENvbnRhaW5lclxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHRAbmV3QnJpY2sgPSBuZXcgQnJpY2tcblx0XHRcdHk6IDBcblx0XHRcdHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0dGl0bGU6IFwiKyBBZGQgbmV3IGJyaWNrXCJcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQ0FBO0FEQUEsSUFBQSwwQkFBQTtFQUFBOzs7O0FBQUEsT0FBTyxDQUFDLE9BQVIsR0FBa0I7O0FBQ2xCLE9BQU8sQ0FBQyxjQUFSLEdBQXlCOztBQUN6QixPQUFPLENBQUMsWUFBUixHQUF1Qjs7QUFFdkIsT0FBTyxDQUFDLE9BQVIsR0FBa0I7O0FBQ2xCLE9BQU8sQ0FBQyxZQUFSLEdBQXVCOztBQUN2QixPQUFPLENBQUMsU0FBUixHQUFvQjs7QUFFcEIsT0FBTyxDQUFDLFNBQVIsR0FBb0I7O0FBQ3BCLE9BQU8sQ0FBQyxTQUFSLEdBQW9COztBQUVkLE9BQU8sQ0FBQzs7O0VBQ0EsbUJBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTO0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLGVBQUEsRUFBaUIsSUFBakI7TUFDQSxLQUFBLEVBQU8sQ0FBQSxHQUFFLE9BQU8sQ0FBQyxPQURqQjtNQUVBLENBQUEsRUFBRyxDQUZIO01BR0EsZ0JBQUEsRUFDQztRQUFBLElBQUEsRUFBSyxHQUFMO1FBQ0EsS0FBQSxFQUFPLE1BQU0sQ0FBQyxJQURkO09BSkQ7TUFN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
