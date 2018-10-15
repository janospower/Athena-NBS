require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"nbs":[function(require,module,exports){
var Brick, Container, Listener, drawSVG,
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

drawSVG = function(x1, y1, x2, y2) {
  var svg;
  svg = '<svg> <path d="M' + (x1 + " " + y1) + ' C ' + (" " + (x1 + ((x2 - x1) * 0.5)) + " " + y1 + " " + (x1 + ((x2 - x1) * 0.5)) + " " + y2 + " " + x2 + " " + y2) + '" stroke="#CC0026" stroke-width="2" fill="none" /> </svg>';
  return svg;
};

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
      html: drawSVG(this.options.x1, this.options.y1, this.options.x2, 50)
    });
    NodeLines.__super__.constructor.call(this, this.options);
    this.x2 = this.options.x2;
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
      x: 0,
      y: 0,
      width: screen.width,
      height: screen.height,
      y1: this.brick.screenFrame.y + this.brick.height / 2 + exports.padding,
      x1: this.x + this.width - exports.padding,
      x2: this.x + this.width + 2 * exports.padding
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
      var x1, x2, xx, y1;
      that.x = this.x - that.width + exports.padding + 20;
      that.y = this.y - exports.padding;
      that.bringToFront();
      y1 = that.brick.screenFrame.y + that.brick.height / 2 + exports.padding;
      x1 = that.brick.screenFrame.x + that.brick.width - exports.padding;
      x2 = that.nodeLine.x2;
      xx = that.brick.screenFrame.x + that.brick.width;
      return that.nodeLine.html = drawSVG(x1, y1, x2, 50);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbm9zL1NpdGVzL0F0aGVuYS1OQlMvQXRoZW5hLU5CUy5mcmFtZXIvbW9kdWxlcy9uYnMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzLnBhZGRpbmcgPSAxNVxuZXhwb3J0cy5zaXR1YXRpb25XaWR0aCA9IDMwMFxuZXhwb3J0cy5ib3JkZXJyYWRpdXMgPSA0XG5cbmV4cG9ydHMucHJpbWFyeSA9IFwiIzAwMjAzRFwiXG5leHBvcnRzLnByaW1hcnlMaWdodCA9IFwiIzRENjM3N1wiXG5leHBvcnRzLnNlY29uZGFyeSA9IFwiI0NDMDAyNlwiXG5cbmV4cG9ydHMubGlzdGVuZXJzID0gW11cbmV4cG9ydHMubm9kZUxpbmtzID0gW11cblxuZHJhd1NWRyA9ICh4MSx5MSx4Mix5MikgLT5cblx0c3ZnID0gJ1xuXHQ8c3ZnPlxuXHRcdDxwYXRoIGQ9XCJNJysgXCIje3gxfSAje3kxfVwiICsnIEMgJytcIiAje3gxKygoeDIteDEpKjAuNSl9ICN7eTF9ICN7eDErKCh4Mi14MSkqMC41KX0gI3t5Mn0gI3t4Mn0gI3t5Mn1cIiArJ1wiIHN0cm9rZT1cIiNDQzAwMjZcIiBzdHJva2Utd2lkdGg9XCIyXCIgZmlsbD1cIm5vbmVcIiAvPlxuXHQ8L3N2Zz5cblx0J1xuXHRyZXR1cm4gc3ZnXG5cbmNsYXNzIGV4cG9ydHMuTm9kZUxpbmVzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHdpZHRoOiAyKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogMFxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTowLjJcblx0XHRcdFx0Y3VydmU6IEJlemllci5lYXNlXG5cdFx0XHRodG1sOiBkcmF3U1ZHKEBvcHRpb25zLngxLEBvcHRpb25zLnkxLEBvcHRpb25zLngyLDUwKVxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAeDIgPSBAb3B0aW9ucy54MlxuXHRcdEAuc3RhdGVzLmNvbGxhcHNlZD1cblx0XHRcdHk6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRzY2FsZVk6IDBcblx0XHRcdGhlaWdodDogMFxuXHRcdFx0b3BhY2l0eTogMFxuXG5cblxuY2xhc3MgTGlzdGVuZXIgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50J1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiBleHBvcnRzLmJvcmRlcnJhZGl1c1xuXHRcdFx0Ym9yZGVyV2lkdGg6IDFcblx0XHRcdGJvcmRlckNvbG9yOiBleHBvcnRzLnByaW1hcnlcblx0XHRcdHdpZHRoOiBleHBvcnRzLnNpdHVhdGlvbldpZHRoIC0gMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdGhlaWdodDogNDBcblx0XHRcdHg6IGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogMypleHBvcnRzLnBhZGRpbmdcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAbGFiZWwgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHRleHQ6IFwiRXZlbnQgTGlzdGVuZXJcIlxuXHRcdFx0Zm9udFNpemU6IDEyXG5cdFx0XHRjb2xvcjogXCJibGFja1wiXG5cdFx0XHR4OiBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IGV4cG9ydHMucGFkZGluZ1xuXG5cbmNsYXNzIEJyaWNrIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiI0NDQ1wiXG5cdFx0XHRoZWlnaHQ6IDEwMFxuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGhcblx0XHRcdHg6IDBcblx0XHRcdGJvcmRlcldpZHRoOiAxXG5cdFx0XHRib3JkZXJDb2xvcjogZXhwb3J0cy5zZWNvbmRhcnlcblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IEBvcHRpb25zLnRpdGxlXG5cdFx0XHRmb250U2l6ZTogMTJcblx0XHRcdGNvbG9yOiBcImJsYWNrXCJcblx0XHRcdHg6IGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogZXhwb3J0cy5wYWRkaW5nXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGxhYmVsLnBhcmVudCA9IEBcblxuXG5cblxuXG5jbGFzcyBDb250YWluZXIgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0eTogMypleHBvcnRzLnBhZGRpbmdcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6MC4yXG5cdFx0XHRcdGN1cnZlOiBCZXppZXIuZWFzZVxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBzY3JvbGxDb21wID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR3aWR0aDogZXhwb3J0cy5zaXR1YXRpb25XaWR0aFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0b3ZlcmRyYWc6IHRydWVcblxuXHRcdEBzY3JvbGxDb21wLm1vdXNlV2hlZWxFbmFibGVkID0gdHJ1ZVxuXG5cblx0XHRALnN0YXRlcy5jb2xsYXBzZWQ9XG5cdFx0XHR5OiAzKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0c2NhbGVZOiAwXG5cdFx0XHRoZWlnaHQ6IDBcblx0XHRcdG9wYWNpdHk6IDBcblxuXG5cblxuXG5jbGFzcyBleHBvcnRzLlNpdHVhdGlvbiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRAbGFiZWwgPSBuZXcgVGV4dExheWVyXG5cdFx0XHR0ZXh0OiBAb3B0aW9ucy5sXG5cdFx0XHRmb250U2l6ZTogMTZcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdHg6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblxuXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBleHBvcnRzLnByaW1hcnlcblx0XHRcdGhlaWdodDogMypleHBvcnRzLnBhZGRpbmcgKyBleHBvcnRzLmJvcmRlcnJhZGl1c1xuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGhcblx0XHRcdGJvcmRlclJhZGl1czogZXhwb3J0cy5ib3JkZXJyYWRpdXNcblx0XHRcdHg6IDIqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAyKmV4cG9ydHMucGFkZGluZ1xuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBsYWJlbC5wYXJlbnQgPSBAXG5cblx0XHRAY29udGFpbmVyID0gbmV3IENvbnRhaW5lclxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHRicmlja3MgPSBbXVxuXHRcdGZvciBjaGlsZCwgaSBpbiBAb3B0aW9ucy5ub2Rlc1xuXHRcdFx0YnJpY2tzLnB1c2ggbmV3IEJyaWNrXG5cdFx0XHRcdHk6IGkqMTAwXG5cdFx0XHRcdHBhcmVudDogQGNvbnRhaW5lci5zY3JvbGxDb21wLmNvbnRlbnRcblx0XHRcdFx0dGl0bGU6IGNoaWxkXG5cblx0XHRicmlja3MucHVzaCBuZXcgQnJpY2tcblx0XHRcdHk6IGJyaWNrcy5sZW5ndGgqMTAwXG5cdFx0XHRwYXJlbnQ6IEBjb250YWluZXIuc2Nyb2xsQ29tcC5jb250ZW50XG5cdFx0XHR0aXRsZTogXCIrIEFkZCBuZXcgYnJpY2tcIlxuXG5cdFx0ZXhwb3J0cy5saXN0ZW5lcnMucHVzaCBuZXcgTGlzdGVuZXJcblx0XHRcdHBhcmVudDogYnJpY2tzW2JyaWNrcy5sZW5ndGgtMl1cblx0XHRcdG5hbWU6IFwiTGlzdGVuZXJcIlxuXG5cdFx0QGJyaWNrID0gYnJpY2tzW2JyaWNrcy5sZW5ndGgtMl1cblxuXHRcdGlmIChAY29udGFpbmVyLnNjcm9sbENvbXAuY29udGVudC5oZWlnaHQgPCA2MjApXG5cdFx0XHRAY29udGFpbmVyLnNjcm9sbENvbXAuaGVpZ2h0ID0gQGNvbnRhaW5lci5zY3JvbGxDb21wLmNvbnRlbnQuaGVpZ2h0XG5cdFx0ZWxzZVxuXHRcdFx0QGNvbnRhaW5lci5zY3JvbGxDb21wLmhlaWdodCA9IDYyMFxuXG5cdFx0QHRyaSA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR3aWR0aDogMjBcblx0XHRcdGhlaWdodDogMjBcblx0XHRcdHg6ZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHN0eWxlOlxuXHRcdFx0XHRcImJhY2tncm91bmRcIiA6IFwidXJsKGltYWdlcy90cmkuc3ZnKSAgIG5vLXJlcGVhdFwiXG5cdFx0XHRcdFwiYmFja2dyb3VuZC1wb3NpdGlvblwiOlwibGVmdCBjZW50ZXJcIlxuXHRcdFx0XHRcImJhY2tncm91bmQtc2l6ZVwiIDogXCJjb250YWluXCJcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6MC4yXG5cdFx0XHRcdGN1cnZlOiBCZXppZXIuZWFzZVxuXG5cdFx0QHRyaS5zdGF0ZXMuY29sbGFwc2VkPVxuXHRcdFx0cm90YXRpb246IC05MFxuXG5cblx0XHRAbm9kZUxpbmUgPSBuZXcgZXhwb3J0cy5Ob2RlTGluZXNcblx0XHRcdHBhcmVudCA6IEBvcHRpb25zLnBcblx0XHRcdHg6IDAjQC54ICsgQC53aWR0aCAtIGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogMCMyKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0d2lkdGg6IHNjcmVlbi53aWR0aFxuXHRcdFx0aGVpZ2h0OiBzY3JlZW4uaGVpZ2h0XG5cdFx0XHR5MTogQGJyaWNrLnNjcmVlbkZyYW1lLnkgKyBAYnJpY2suaGVpZ2h0LzIgKyBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHgxOiBALnggKyBALndpZHRoIC0gZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR4MjogQC54ICsgQC53aWR0aCArIDIqZXhwb3J0cy5wYWRkaW5nXG5cblx0XHRleHBvcnRzLm5vZGVMaW5rcy5wdXNoIEBub2RlTGluZVxuXG5cdFx0QHRyaS5vbkNsaWNrIEBUb2dnbGVcblxuXHRUb2dnbGU6ID0+XG5cdFx0QGNvbnRhaW5lci5zdGF0ZUN5Y2xlIFwiY29sbGFwc2VkXCIsIFwiZGVmYXVsdFwiXG5cdFx0QHRyaS5zdGF0ZUN5Y2xlIFwiY29sbGFwc2VkXCIsIFwiZGVmYXVsdFwiXG5cdFx0QG5vZGVMaW5lLnN0YXRlQ3ljbGUgXCJjb2xsYXBzZWRcIiwgXCJkZWZhdWx0XCJcblxuXG5cblxuXG5cbmNsYXNzIGV4cG9ydHMuRHJhZ0hhbmRsZSBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHR0aGF0ID0gQG9wdGlvbnMucFxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHdpZHRoOiAyMFxuXHRcdFx0aGVpZ2h0OiAyMFxuXHRcdFx0eDogdGhhdC54ICsgdGhhdC53aWR0aCAtIDIwIC0gZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiB0aGF0LnkgKyBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHN0eWxlOlxuXHRcdFx0XHRcImJhY2tncm91bmRcIiA6IFwidXJsKGltYWdlcy9kcmFnaGFuZGxlLnN2ZykgICBuby1yZXBlYXRcIlxuXHRcdFx0XHRcImJhY2tncm91bmQtcG9zaXRpb25cIjpcImxlZnQgY2VudGVyXCJcblx0XHRcdFx0XCJiYWNrZ3JvdW5kLXNpemVcIiA6IFwiY29udGFpblwiXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEAuZHJhZ2dhYmxlLmVuYWJsZWQgPSB0cnVlXG5cdFx0QC5kcmFnZ2FibGUuY29uc3RyYWludHMgPSB7XG5cdFx0XHR4OiBALnhcblx0XHRcdHk6IEAueVxuXHRcdFx0d2lkdGg6IDBcblx0XHRcdGhlaWdodDogMFxuXHRcdH1cblx0XHRALm9uIEV2ZW50cy5Nb3ZlLCAtPlxuXHRcdFx0dGhhdC54ID0gQC54IC0gdGhhdC53aWR0aCArIGV4cG9ydHMucGFkZGluZyArIDIwXG5cdFx0XHR0aGF0LnkgPSBALnkgLSBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHRoYXQuYnJpbmdUb0Zyb250KClcblx0XHRcdHkxID0gdGhhdC5icmljay5zY3JlZW5GcmFtZS55ICsgdGhhdC5icmljay5oZWlnaHQvMiArIGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eDEgPSB0aGF0LmJyaWNrLnNjcmVlbkZyYW1lLnggKyB0aGF0LmJyaWNrLndpZHRoIC0gZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR4MiA9IHRoYXQubm9kZUxpbmUueDJcblx0XHRcdHh4ID0gdGhhdC5icmljay5zY3JlZW5GcmFtZS54ICsgdGhhdC5icmljay53aWR0aFxuXHRcdFx0dGhhdC5ub2RlTGluZS5odG1sID0gZHJhd1NWRyh4MSx5MSx4Miw1MClcblxuXG5jbGFzcyBleHBvcnRzLk5ld1NpdHVhdGlvbiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRAbGFiZWwgPSBuZXcgVGV4dExheWVyXG5cdFx0XHR0ZXh0OiBcIk5ldyBTaXR1YXRpb25cIlxuXHRcdFx0Zm9udFNpemU6IDE2XG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHR4OiAzKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogZXhwb3J0cy5wYWRkaW5nXG5cblxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogZXhwb3J0cy5wcmltYXJ5XG5cdFx0XHRoZWlnaHQ6IDMqZXhwb3J0cy5wYWRkaW5nICsgZXhwb3J0cy5ib3JkZXJyYWRpdXNcblx0XHRcdHdpZHRoOiBleHBvcnRzLnNpdHVhdGlvbldpZHRoXG5cdFx0XHRib3JkZXJSYWRpdXM6IGV4cG9ydHMuYm9yZGVycmFkaXVzXG5cdFx0XHR4OiAyKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogMipleHBvcnRzLnBhZGRpbmdcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAbGFiZWwucGFyZW50ID0gQFxuXG5cdFx0QGNvbnRhaW5lciA9IG5ldyBDb250YWluZXJcblx0XHRcdHBhcmVudDogQFxuXG5cdFx0QG5ld0JyaWNrID0gbmV3IEJyaWNrXG5cdFx0XHR5OiAwXG5cdFx0XHRwYXJlbnQ6IEBjb250YWluZXJcblx0XHRcdHRpdGxlOiBcIisgQWRkIG5ldyBicmlja1wiXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUNBQTtBREFBLElBQUEsbUNBQUE7RUFB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
