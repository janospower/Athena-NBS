require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"nbs":[function(require,module,exports){
var Brick, Container, Listener, drawSVG,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

exports.padding = 15;

exports.situationWidth = 300;

exports.borderradius = 4;

exports.primary = "#00203D";

exports.primaryDark = "#11151A";

exports.primaryLight = "#2A445C";

exports.secondary = "#CC0026";

exports.listeners = [];

exports.nodeLinks = [];

drawSVG = function(x1, y1, x2, y2) {
  var svg;
  svg = '<svg> <path d="M' + (x1 + " " + y1) + ' C ' + (" " + (x1 + ((x2 - x1) * 0.5)) + " " + y1 + " " + (x1 + ((x2 - x1) * 0.5)) + " " + y2 + " " + x2 + " " + y2) + '" stroke="#FFFFFF" stroke-width="2" fill="none" /> </svg>';
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
      borderColor: exports.primaryLight,
      width: exports.situationWidth - 2 * exports.padding,
      height: 40,
      x: exports.padding,
      y: 3 * exports.padding
    });
    Listener.__super__.constructor.call(this, this.options);
    this.label = new TextLayer({
      parent: this,
      text: "Event Listener",
      fontSize: 14,
      color: "white",
      point: Align.center
    });
  }

  return Listener;

})(Layer);

Brick = (function(superClass) {
  extend(Brick, superClass);

  function Brick(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      backgroundColor: exports.primary,
      height: 100,
      width: exports.situationWidth,
      x: 0,
      borderWidth: 1,
      borderRadius: exports.borderradius / 2,
      borderColor: exports.primaryLight
    });
    this.label = new TextLayer({
      text: this.options.title,
      fontSize: 14,
      color: "white",
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
      textTransform: "uppercase",
      fontWeight: "700",
      letterSpacing: 2,
      x: 3 * exports.padding,
      y: exports.padding
    });
    _.defaults(this.options, {
      backgroundColor: exports.primary,
      height: 3 * exports.padding + exports.borderradius,
      width: exports.situationWidth,
      borderRadius: exports.borderradius,
      borderWidth: 1,
      borderColor: exports.primaryLight,
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
      textTransform: "uppercase",
      fontWeight: "700",
      letterSpacing: 2,
      x: 3 * exports.padding,
      y: exports.padding
    });
    _.defaults(this.options, {
      backgroundColor: exports.primary,
      height: 3 * exports.padding + exports.borderradius,
      width: exports.situationWidth,
      borderRadius: exports.borderradius,
      borderWidth: 1,
      borderColor: exports.primaryLight,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbm9zL1NpdGVzL0F0aGVuYS1OQlMvQXRoZW5hLU5CUy5mcmFtZXIvbW9kdWxlcy9uYnMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzLnBhZGRpbmcgPSAxNVxuZXhwb3J0cy5zaXR1YXRpb25XaWR0aCA9IDMwMFxuZXhwb3J0cy5ib3JkZXJyYWRpdXMgPSA0XG5cbmV4cG9ydHMucHJpbWFyeSA9IFwiIzAwMjAzRFwiXG5leHBvcnRzLnByaW1hcnlEYXJrID0gXCIjMTExNTFBXCJcbmV4cG9ydHMucHJpbWFyeUxpZ2h0ID0gXCIjMkE0NDVDXCJcbmV4cG9ydHMuc2Vjb25kYXJ5ID0gXCIjQ0MwMDI2XCJcblxuZXhwb3J0cy5saXN0ZW5lcnMgPSBbXVxuZXhwb3J0cy5ub2RlTGlua3MgPSBbXVxuXG5kcmF3U1ZHID0gKHgxLHkxLHgyLHkyKSAtPlxuXHRzdmcgPSAnXG5cdDxzdmc+XG5cdFx0PHBhdGggZD1cIk0nKyBcIiN7eDF9ICN7eTF9XCIgKycgQyAnK1wiICN7eDErKCh4Mi14MSkqMC41KX0gI3t5MX0gI3t4MSsoKHgyLXgxKSowLjUpfSAje3kyfSAje3gyfSAje3kyfVwiICsnXCIgc3Ryb2tlPVwiI0ZGRkZGRlwiIHN0cm9rZS13aWR0aD1cIjJcIiBmaWxsPVwibm9uZVwiIC8+XG5cdDwvc3ZnPlxuXHQnXG5cdHJldHVybiBzdmdcblxuY2xhc3MgZXhwb3J0cy5Ob2RlTGluZXMgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0d2lkdGg6IDIqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAwXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOjAuMlxuXHRcdFx0XHRjdXJ2ZTogQmV6aWVyLmVhc2Vcblx0XHRcdGh0bWw6IGRyYXdTVkcoQG9wdGlvbnMueDEsQG9wdGlvbnMueTEsQG9wdGlvbnMueDIsNTApXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEB4MiA9IEBvcHRpb25zLngyXG5cdFx0QC5zdGF0ZXMuY29sbGFwc2VkPVxuXHRcdFx0eTogMypleHBvcnRzLnBhZGRpbmdcblx0XHRcdHNjYWxlWTogMFxuXHRcdFx0aGVpZ2h0OiAwXG5cdFx0XHRvcGFjaXR5OiAwXG5cblxuXG5jbGFzcyBMaXN0ZW5lciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnXG5cdFx0XHRib3JkZXJSYWRpdXM6IGV4cG9ydHMuYm9yZGVycmFkaXVzXG5cdFx0XHRib3JkZXJXaWR0aDogMVxuXHRcdFx0Ym9yZGVyQ29sb3I6IGV4cG9ydHMucHJpbWFyeUxpZ2h0XG5cdFx0XHR3aWR0aDogZXhwb3J0cy5zaXR1YXRpb25XaWR0aCAtIDIqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRoZWlnaHQ6IDQwXG5cdFx0XHR4OiBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IDMqZXhwb3J0cy5wYWRkaW5nXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGxhYmVsID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR0ZXh0OiBcIkV2ZW50IExpc3RlbmVyXCJcblx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0cG9pbnQ6IEFsaWduLmNlbnRlclxuXG5cbmNsYXNzIEJyaWNrIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGV4cG9ydHMucHJpbWFyeVxuXHRcdFx0aGVpZ2h0OiAxMDBcblx0XHRcdHdpZHRoOiBleHBvcnRzLnNpdHVhdGlvbldpZHRoXG5cdFx0XHR4OiAwXG5cdFx0XHRib3JkZXJXaWR0aDogMVxuXHRcdFx0Ym9yZGVyUmFkaXVzOiBleHBvcnRzLmJvcmRlcnJhZGl1cy8yXG5cdFx0XHRib3JkZXJDb2xvcjogZXhwb3J0cy5wcmltYXJ5TGlnaHRcblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IEBvcHRpb25zLnRpdGxlXG5cdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdHg6IGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogZXhwb3J0cy5wYWRkaW5nXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGxhYmVsLnBhcmVudCA9IEBcblxuXG5cblxuXG5jbGFzcyBDb250YWluZXIgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0eTogMypleHBvcnRzLnBhZGRpbmdcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6MC4yXG5cdFx0XHRcdGN1cnZlOiBCZXppZXIuZWFzZVxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBzY3JvbGxDb21wID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR3aWR0aDogZXhwb3J0cy5zaXR1YXRpb25XaWR0aFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0b3ZlcmRyYWc6IHRydWVcblxuXHRcdEBzY3JvbGxDb21wLm1vdXNlV2hlZWxFbmFibGVkID0gdHJ1ZVxuXG5cblx0XHRALnN0YXRlcy5jb2xsYXBzZWQ9XG5cdFx0XHR5OiAzKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0c2NhbGVZOiAwXG5cdFx0XHRoZWlnaHQ6IDBcblx0XHRcdG9wYWNpdHk6IDBcblxuXG5cblxuXG5jbGFzcyBleHBvcnRzLlNpdHVhdGlvbiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRAbGFiZWwgPSBuZXcgVGV4dExheWVyXG5cdFx0XHR0ZXh0OiBAb3B0aW9ucy5sXG5cdFx0XHRmb250U2l6ZTogMTZcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdHRleHRUcmFuc2Zvcm06IFwidXBwZXJjYXNlXCJcblx0XHRcdGZvbnRXZWlnaHQ6IFwiNzAwXCJcblx0XHRcdGxldHRlclNwYWNpbmc6IDJcblx0XHRcdHg6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGV4cG9ydHMucHJpbWFyeVxuXHRcdFx0aGVpZ2h0OiAzKmV4cG9ydHMucGFkZGluZyArIGV4cG9ydHMuYm9yZGVycmFkaXVzXG5cdFx0XHR3aWR0aDogZXhwb3J0cy5zaXR1YXRpb25XaWR0aFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiBleHBvcnRzLmJvcmRlcnJhZGl1c1xuXHRcdFx0Ym9yZGVyV2lkdGg6IDFcblx0XHRcdGJvcmRlckNvbG9yOiBleHBvcnRzLnByaW1hcnlMaWdodFxuXHRcdFx0eDogMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IDIqZXhwb3J0cy5wYWRkaW5nXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGxhYmVsLnBhcmVudCA9IEBcblxuXHRcdEBjb250YWluZXIgPSBuZXcgQ29udGFpbmVyXG5cdFx0XHRwYXJlbnQ6IEBcblxuXHRcdGJyaWNrcyA9IFtdXG5cdFx0Zm9yIGNoaWxkLCBpIGluIEBvcHRpb25zLm5vZGVzXG5cdFx0XHRicmlja3MucHVzaCBuZXcgQnJpY2tcblx0XHRcdFx0eTogaSoxMDBcblx0XHRcdFx0cGFyZW50OiBAY29udGFpbmVyLnNjcm9sbENvbXAuY29udGVudFxuXHRcdFx0XHR0aXRsZTogY2hpbGRcblxuXHRcdGJyaWNrcy5wdXNoIG5ldyBCcmlja1xuXHRcdFx0eTogYnJpY2tzLmxlbmd0aCoxMDBcblx0XHRcdHBhcmVudDogQGNvbnRhaW5lci5zY3JvbGxDb21wLmNvbnRlbnRcblx0XHRcdHRpdGxlOiBcIisgQWRkIG5ldyBicmlja1wiXG5cblx0XHRleHBvcnRzLmxpc3RlbmVycy5wdXNoIG5ldyBMaXN0ZW5lclxuXHRcdFx0cGFyZW50OiBicmlja3NbYnJpY2tzLmxlbmd0aC0yXVxuXHRcdFx0bmFtZTogXCJMaXN0ZW5lclwiXG5cblx0XHRAYnJpY2sgPSBicmlja3NbYnJpY2tzLmxlbmd0aC0yXVxuXG5cdFx0aWYgKEBjb250YWluZXIuc2Nyb2xsQ29tcC5jb250ZW50LmhlaWdodCA8IDYyMClcblx0XHRcdEBjb250YWluZXIuc2Nyb2xsQ29tcC5oZWlnaHQgPSBAY29udGFpbmVyLnNjcm9sbENvbXAuY29udGVudC5oZWlnaHRcblx0XHRlbHNlXG5cdFx0XHRAY29udGFpbmVyLnNjcm9sbENvbXAuaGVpZ2h0ID0gNjIwXG5cblx0XHRAdHJpID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiAyMFxuXHRcdFx0aGVpZ2h0OiAyMFxuXHRcdFx0eDpleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdFwiYmFja2dyb3VuZFwiIDogXCJ1cmwoaW1hZ2VzL3RyaS5zdmcpICAgbm8tcmVwZWF0XCJcblx0XHRcdFx0XCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCI6XCJsZWZ0IGNlbnRlclwiXG5cdFx0XHRcdFwiYmFja2dyb3VuZC1zaXplXCIgOiBcImNvbnRhaW5cIlxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTowLjJcblx0XHRcdFx0Y3VydmU6IEJlemllci5lYXNlXG5cblx0XHRAdHJpLnN0YXRlcy5jb2xsYXBzZWQ9XG5cdFx0XHRyb3RhdGlvbjogLTkwXG5cblxuXHRcdEBub2RlTGluZSA9IG5ldyBleHBvcnRzLk5vZGVMaW5lc1xuXHRcdFx0cGFyZW50IDogQG9wdGlvbnMucFxuXHRcdFx0eDogMCNALnggKyBALndpZHRoIC0gZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAwIzIqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR3aWR0aDogc2NyZWVuLndpZHRoXG5cdFx0XHRoZWlnaHQ6IHNjcmVlbi5oZWlnaHRcblx0XHRcdHkxOiBAYnJpY2suc2NyZWVuRnJhbWUueSArIEBicmljay5oZWlnaHQvMiArIGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eDE6IEAueCArIEAud2lkdGggLSBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHgyOiBALnggKyBALndpZHRoICsgMipleHBvcnRzLnBhZGRpbmdcblxuXHRcdGV4cG9ydHMubm9kZUxpbmtzLnB1c2ggQG5vZGVMaW5lXG5cblx0XHRAdHJpLm9uQ2xpY2sgQFRvZ2dsZVxuXG5cdFRvZ2dsZTogPT5cblx0XHRAY29udGFpbmVyLnN0YXRlQ3ljbGUgXCJjb2xsYXBzZWRcIiwgXCJkZWZhdWx0XCJcblx0XHRAdHJpLnN0YXRlQ3ljbGUgXCJjb2xsYXBzZWRcIiwgXCJkZWZhdWx0XCJcblx0XHRAbm9kZUxpbmUuc3RhdGVDeWNsZSBcImNvbGxhcHNlZFwiLCBcImRlZmF1bHRcIlxuXG5cblxuXG5cblxuY2xhc3MgZXhwb3J0cy5EcmFnSGFuZGxlIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdHRoYXQgPSBAb3B0aW9ucy5wXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0d2lkdGg6IDIwXG5cdFx0XHRoZWlnaHQ6IDIwXG5cdFx0XHR4OiB0aGF0LnggKyB0aGF0LndpZHRoIC0gMjAgLSBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IHRoYXQueSArIGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdFwiYmFja2dyb3VuZFwiIDogXCJ1cmwoaW1hZ2VzL2RyYWdoYW5kbGUuc3ZnKSAgIG5vLXJlcGVhdFwiXG5cdFx0XHRcdFwiYmFja2dyb3VuZC1wb3NpdGlvblwiOlwibGVmdCBjZW50ZXJcIlxuXHRcdFx0XHRcImJhY2tncm91bmQtc2l6ZVwiIDogXCJjb250YWluXCJcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QC5kcmFnZ2FibGUuZW5hYmxlZCA9IHRydWVcblx0XHRALmRyYWdnYWJsZS5jb25zdHJhaW50cyA9IHtcblx0XHRcdHg6IEAueFxuXHRcdFx0eTogQC55XG5cdFx0XHR3aWR0aDogMFxuXHRcdFx0aGVpZ2h0OiAwXG5cdFx0fVxuXHRcdEAub24gRXZlbnRzLk1vdmUsIC0+XG5cdFx0XHR0aGF0LnggPSBALnggLSB0aGF0LndpZHRoICsgZXhwb3J0cy5wYWRkaW5nICsgMjBcblx0XHRcdHRoYXQueSA9IEAueSAtIGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0dGhhdC5icmluZ1RvRnJvbnQoKVxuXHRcdFx0eTEgPSB0aGF0LmJyaWNrLnNjcmVlbkZyYW1lLnkgKyB0aGF0LmJyaWNrLmhlaWdodC8yICsgZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR4MSA9IHRoYXQuYnJpY2suc2NyZWVuRnJhbWUueCArIHRoYXQuYnJpY2sud2lkdGggLSBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHgyID0gdGhhdC5ub2RlTGluZS54MlxuXHRcdFx0eHggPSB0aGF0LmJyaWNrLnNjcmVlbkZyYW1lLnggKyB0aGF0LmJyaWNrLndpZHRoXG5cdFx0XHR0aGF0Lm5vZGVMaW5lLmh0bWwgPSBkcmF3U1ZHKHgxLHkxLHgyLDUwKVxuXG5cbmNsYXNzIGV4cG9ydHMuTmV3U2l0dWF0aW9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IFwiTmV3IFNpdHVhdGlvblwiXG5cdFx0XHRmb250U2l6ZTogMTZcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdHRleHRUcmFuc2Zvcm06IFwidXBwZXJjYXNlXCJcblx0XHRcdGZvbnRXZWlnaHQ6IFwiNzAwXCJcblx0XHRcdGxldHRlclNwYWNpbmc6IDJcblx0XHRcdHg6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblxuXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBleHBvcnRzLnByaW1hcnlcblx0XHRcdGhlaWdodDogMypleHBvcnRzLnBhZGRpbmcgKyBleHBvcnRzLmJvcmRlcnJhZGl1c1xuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGhcblx0XHRcdGJvcmRlclJhZGl1czogZXhwb3J0cy5ib3JkZXJyYWRpdXNcblx0XHRcdGJvcmRlcldpZHRoOiAxXG5cdFx0XHRib3JkZXJDb2xvcjogZXhwb3J0cy5wcmltYXJ5TGlnaHRcblx0XHRcdHg6IDIqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAyKmV4cG9ydHMucGFkZGluZ1xuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBsYWJlbC5wYXJlbnQgPSBAXG5cblx0XHRAY29udGFpbmVyID0gbmV3IENvbnRhaW5lclxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHRAbmV3QnJpY2sgPSBuZXcgQnJpY2tcblx0XHRcdHk6IDBcblx0XHRcdHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0dGl0bGU6IFwiKyBBZGQgbmV3IGJyaWNrXCJcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQ0FBO0FEQUEsSUFBQSxtQ0FBQTtFQUFBOzs7O0FBQUEsT0FBTyxDQUFDLE9BQVIsR0FBa0I7O0FBQ2xCLE9BQU8sQ0FBQyxjQUFSLEdBQXlCOztBQUN6QixPQUFPLENBQUMsWUFBUixHQUF1Qjs7QUFFdkIsT0FBTyxDQUFDLE9BQVIsR0FBa0I7O0FBQ2xCLE9BQU8sQ0FBQyxXQUFSLEdBQXNCOztBQUN0QixPQUFPLENBQUMsWUFBUixHQUF1Qjs7QUFDdkIsT0FBTyxDQUFDLFNBQVIsR0FBb0I7O0FBRXBCLE9BQU8sQ0FBQyxTQUFSLEdBQW9COztBQUNwQixPQUFPLENBQUMsU0FBUixHQUFvQjs7QUFFcEIsT0FBQSxHQUFVLFNBQUMsRUFBRCxFQUFJLEVBQUosRUFBTyxFQUFQLEVBQVUsRUFBVjtBQUNULE1BQUE7RUFBQSxHQUFBLEdBQU0sa0JBQUEsR0FFUSxDQUFHLEVBQUQsR0FBSSxHQUFKLEdBQU8sRUFBVCxDQUZSLEdBRXVCLEtBRnZCLEdBRTZCLENBQUEsR0FBQSxHQUFHLENBQUMsRUFBQSxHQUFHLENBQUMsQ0FBQyxFQUFBLEdBQUcsRUFBSixDQUFBLEdBQVEsR0FBVCxDQUFKLENBQUgsR0FBcUIsR0FBckIsR0FBd0IsRUFBeEIsR0FBMkIsR0FBM0IsR0FBNkIsQ0FBQyxFQUFBLEdB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
