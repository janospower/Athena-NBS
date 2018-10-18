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

exports.scrolled = 0;

exports.listeners = [];

exports.nodeLinks = [];

drawSVG = function(x1, y1, x2, y2) {
  var svg;
  svg = '<svg> <circle cx="' + ("" + x1) + '" cy="' + ("" + y1) + '" r="4" stroke="none" fill="#FFFFFF" /> <path d="M' + (x1 + " " + y1) + ' C ' + (" " + (x1 + ((x2 - x1) * 0.5)) + " " + y1 + " " + (x1 + ((x2 - x1) * 0.5)) + " " + y2 + " " + x2 + " " + y2) + '" stroke="#FFFFFF" stroke-width="2" fill="none" /> <circle cx="' + ("" + x2) + '" cy="' + ("" + y2) + '" r="4" stroke="none" fill="#FFFFFF" /> </svg>';
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
    this.x1 = this.options.x1;
    this.y1 = this.options.y1;
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
      backgroundColor: 'transparent',
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
    var last, that;
    this.options = options != null ? options : {};
    that = this.options.p;
    last = this.options.plast;
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
      var lastx1, lastx2, lasty1, lasty2, x1, x2, y1;
      that.x = this.x - that.width + exports.padding + 20;
      that.y = this.y - exports.padding;
      that.bringToFront();
      y1 = that.brick.screenFrame.y + that.brick.height / 2 + exports.padding;
      x1 = that.brick.screenFrame.x + that.brick.width - exports.padding - exports.scrolled;
      x2 = that.nodeLine.x2;
      that.nodeLine.html = drawSVG(x1, y1, x2, 50);
      if (last) {
        lasty2 = this.screenFrame.y + this.height / 2;
        lastx2 = that.brick.screenFrame.x - exports.scrolled;
        lastx1 = last.nodeLine.x1;
        lasty1 = last.nodeLine.y1;
        return last.nodeLine.html = drawSVG(lastx1, lasty1, lastx2, lasty2);
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbm9zL1NpdGVzL0F0aGVuYS1OQlMvQXRoZW5hLU5CUy5mcmFtZXIvbW9kdWxlcy9uYnMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzLnBhZGRpbmcgPSAxNVxuZXhwb3J0cy5zaXR1YXRpb25XaWR0aCA9IDMwMFxuZXhwb3J0cy5ib3JkZXJyYWRpdXMgPSA0XG5cbmV4cG9ydHMucHJpbWFyeSA9IFwiIzAwMjAzRFwiXG5leHBvcnRzLnByaW1hcnlEYXJrID0gXCIjMTExNTFBXCJcbmV4cG9ydHMucHJpbWFyeUxpZ2h0ID0gXCIjMkE0NDVDXCJcbmV4cG9ydHMuc2Vjb25kYXJ5ID0gXCIjQ0MwMDI2XCJcblxuZXhwb3J0cy5zY3JvbGxlZCA9IDBcblxuZXhwb3J0cy5saXN0ZW5lcnMgPSBbXVxuZXhwb3J0cy5ub2RlTGlua3MgPSBbXVxuXG5kcmF3U1ZHID0gKHgxLHkxLHgyLHkyKSAtPlxuXHRzdmcgPSAnXG5cdDxzdmc+XG5cdFx0PGNpcmNsZSBjeD1cIicrIFwiI3t4MX1cIiArJ1wiIGN5PVwiJysgXCIje3kxfVwiICsnXCIgcj1cIjRcIiBzdHJva2U9XCJub25lXCIgZmlsbD1cIiNGRkZGRkZcIiAvPlxuXHRcdDxwYXRoIGQ9XCJNJysgXCIje3gxfSAje3kxfVwiICsnIEMgJytcIiAje3gxKygoeDIteDEpKjAuNSl9ICN7eTF9ICN7eDErKCh4Mi14MSkqMC41KX0gI3t5Mn0gI3t4Mn0gI3t5Mn1cIiArJ1wiIHN0cm9rZT1cIiNGRkZGRkZcIiBzdHJva2Utd2lkdGg9XCIyXCIgZmlsbD1cIm5vbmVcIiAvPlxuXHRcdDxjaXJjbGUgY3g9XCInKyBcIiN7eDJ9XCIgKydcIiBjeT1cIicrIFwiI3t5Mn1cIiArJ1wiIHI9XCI0XCIgc3Ryb2tlPVwibm9uZVwiIGZpbGw9XCIjRkZGRkZGXCIgLz5cblx0PC9zdmc+XG5cdCdcblx0cmV0dXJuIHN2Z1xuXG5jbGFzcyBleHBvcnRzLk5vZGVMaW5lcyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR3aWR0aDogMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IDBcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6MC4yXG5cdFx0XHRcdGN1cnZlOiBCZXppZXIuZWFzZVxuXHRcdFx0aHRtbDogZHJhd1NWRyhAb3B0aW9ucy54MSxAb3B0aW9ucy55MSxAb3B0aW9ucy54Miw1MClcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHgyID0gQG9wdGlvbnMueDJcblx0XHRAeDEgPSBAb3B0aW9ucy54MVxuXHRcdEB5MSA9IEBvcHRpb25zLnkxXG5cdFx0QC5zdGF0ZXMuY29sbGFwc2VkPVxuXHRcdFx0eTogMypleHBvcnRzLnBhZGRpbmdcblx0XHRcdHNjYWxlWTogMFxuXHRcdFx0aGVpZ2h0OiAwXG5cdFx0XHRvcGFjaXR5OiAwXG5cblxuXG5jbGFzcyBMaXN0ZW5lciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnXG5cdFx0XHRib3JkZXJSYWRpdXM6IGV4cG9ydHMuYm9yZGVycmFkaXVzXG5cdFx0XHRib3JkZXJXaWR0aDogMVxuXHRcdFx0Ym9yZGVyQ29sb3I6IGV4cG9ydHMucHJpbWFyeUxpZ2h0XG5cdFx0XHR3aWR0aDogZXhwb3J0cy5zaXR1YXRpb25XaWR0aCAtIDIqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRoZWlnaHQ6IDQwXG5cdFx0XHR4OiBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IDMqZXhwb3J0cy5wYWRkaW5nXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGxhYmVsID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR0ZXh0OiBcIkV2ZW50IExpc3RlbmVyXCJcblx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0cG9pbnQ6IEFsaWduLmNlbnRlclxuXG5cbmNsYXNzIEJyaWNrIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGV4cG9ydHMucHJpbWFyeVxuXHRcdFx0aGVpZ2h0OiAxMDBcblx0XHRcdHdpZHRoOiBleHBvcnRzLnNpdHVhdGlvbldpZHRoXG5cdFx0XHR4OiAwXG5cdFx0XHRib3JkZXJXaWR0aDogMVxuXHRcdFx0Ym9yZGVyUmFkaXVzOiBleHBvcnRzLmJvcmRlcnJhZGl1cy8yXG5cdFx0XHRib3JkZXJDb2xvcjogZXhwb3J0cy5wcmltYXJ5TGlnaHRcblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IEBvcHRpb25zLnRpdGxlXG5cdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdHg6IGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogZXhwb3J0cy5wYWRkaW5nXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGxhYmVsLnBhcmVudCA9IEBcblxuXG5cblxuXG5jbGFzcyBDb250YWluZXIgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0eTogMypleHBvcnRzLnBhZGRpbmdcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6MC4yXG5cdFx0XHRcdGN1cnZlOiBCZXppZXIuZWFzZVxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBzY3JvbGxDb21wID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR3aWR0aDogZXhwb3J0cy5zaXR1YXRpb25XaWR0aFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0b3ZlcmRyYWc6IHRydWVcblxuXHRcdEBzY3JvbGxDb21wLm1vdXNlV2hlZWxFbmFibGVkID0gdHJ1ZVxuXG5cblx0XHRALnN0YXRlcy5jb2xsYXBzZWQ9XG5cdFx0XHR5OiAzKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0c2NhbGVZOiAwXG5cdFx0XHRoZWlnaHQ6IDBcblx0XHRcdG9wYWNpdHk6IDBcblxuXG5cblxuXG5jbGFzcyBleHBvcnRzLlNpdHVhdGlvbiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRAbGFiZWwgPSBuZXcgVGV4dExheWVyXG5cdFx0XHR0ZXh0OiBAb3B0aW9ucy5sXG5cdFx0XHRmb250U2l6ZTogMTZcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdHRleHRUcmFuc2Zvcm06IFwidXBwZXJjYXNlXCJcblx0XHRcdGZvbnRXZWlnaHQ6IFwiNzAwXCJcblx0XHRcdGxldHRlclNwYWNpbmc6IDJcblx0XHRcdHg6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGV4cG9ydHMucHJpbWFyeVxuXHRcdFx0aGVpZ2h0OiAzKmV4cG9ydHMucGFkZGluZyArIGV4cG9ydHMuYm9yZGVycmFkaXVzXG5cdFx0XHR3aWR0aDogZXhwb3J0cy5zaXR1YXRpb25XaWR0aFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiBleHBvcnRzLmJvcmRlcnJhZGl1c1xuXHRcdFx0Ym9yZGVyV2lkdGg6IDFcblx0XHRcdGJvcmRlckNvbG9yOiBleHBvcnRzLnByaW1hcnlMaWdodFxuXHRcdFx0eDogMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IDIqZXhwb3J0cy5wYWRkaW5nXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGxhYmVsLnBhcmVudCA9IEBcblxuXHRcdEBjb250YWluZXIgPSBuZXcgQ29udGFpbmVyXG5cdFx0XHRwYXJlbnQ6IEBcblxuXHRcdGJyaWNrcyA9IFtdXG5cdFx0Zm9yIGNoaWxkLCBpIGluIEBvcHRpb25zLm5vZGVzXG5cdFx0XHRicmlja3MucHVzaCBuZXcgQnJpY2tcblx0XHRcdFx0eTogaSoxMDBcblx0XHRcdFx0cGFyZW50OiBAY29udGFpbmVyLnNjcm9sbENvbXAuY29udGVudFxuXHRcdFx0XHR0aXRsZTogY2hpbGRcblxuXHRcdGJyaWNrcy5wdXNoIG5ldyBCcmlja1xuXHRcdFx0eTogYnJpY2tzLmxlbmd0aCoxMDBcblx0XHRcdHBhcmVudDogQGNvbnRhaW5lci5zY3JvbGxDb21wLmNvbnRlbnRcblx0XHRcdHRpdGxlOiBcIisgQWRkIG5ldyBicmlja1wiXG5cblx0XHRleHBvcnRzLmxpc3RlbmVycy5wdXNoIG5ldyBMaXN0ZW5lclxuXHRcdFx0cGFyZW50OiBicmlja3NbYnJpY2tzLmxlbmd0aC0yXVxuXHRcdFx0bmFtZTogXCJMaXN0ZW5lclwiXG5cblx0XHRAYnJpY2sgPSBicmlja3NbYnJpY2tzLmxlbmd0aC0yXVxuXG5cdFx0aWYgKEBjb250YWluZXIuc2Nyb2xsQ29tcC5jb250ZW50LmhlaWdodCA8IDYyMClcblx0XHRcdEBjb250YWluZXIuc2Nyb2xsQ29tcC5oZWlnaHQgPSBAY29udGFpbmVyLnNjcm9sbENvbXAuY29udGVudC5oZWlnaHRcblx0XHRlbHNlXG5cdFx0XHRAY29udGFpbmVyLnNjcm9sbENvbXAuaGVpZ2h0ID0gNjIwXG5cblx0XHRAdHJpID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiAyMFxuXHRcdFx0aGVpZ2h0OiAyMFxuXHRcdFx0eDpleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdFwiYmFja2dyb3VuZFwiIDogXCJ1cmwoaW1hZ2VzL3RyaS5zdmcpICAgbm8tcmVwZWF0XCJcblx0XHRcdFx0XCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCI6XCJsZWZ0IGNlbnRlclwiXG5cdFx0XHRcdFwiYmFja2dyb3VuZC1zaXplXCIgOiBcImNvbnRhaW5cIlxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTowLjJcblx0XHRcdFx0Y3VydmU6IEJlemllci5lYXNlXG5cblx0XHRAdHJpLnN0YXRlcy5jb2xsYXBzZWQ9XG5cdFx0XHRyb3RhdGlvbjogLTkwXG5cblxuXHRcdEBub2RlTGluZSA9IG5ldyBleHBvcnRzLk5vZGVMaW5lc1xuXHRcdFx0cGFyZW50IDogQG9wdGlvbnMucFxuXHRcdFx0eDogMCNALnggKyBALndpZHRoIC0gZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAwIzIqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR3aWR0aDogc2NyZWVuLndpZHRoXG5cdFx0XHRoZWlnaHQ6IHNjcmVlbi5oZWlnaHRcblx0XHRcdHkxOiBAYnJpY2suc2NyZWVuRnJhbWUueSArIEBicmljay5oZWlnaHQvMiArIGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eDE6IEAueCArIEAud2lkdGggLSBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHgyOiBALnggKyBALndpZHRoICsgMipleHBvcnRzLnBhZGRpbmdcblxuXHRcdGV4cG9ydHMubm9kZUxpbmtzLnB1c2ggQG5vZGVMaW5lXG5cblx0XHRAdHJpLm9uQ2xpY2sgQFRvZ2dsZVxuXG5cdFRvZ2dsZTogPT5cblx0XHRAY29udGFpbmVyLnN0YXRlQ3ljbGUgXCJjb2xsYXBzZWRcIiwgXCJkZWZhdWx0XCJcblx0XHRAdHJpLnN0YXRlQ3ljbGUgXCJjb2xsYXBzZWRcIiwgXCJkZWZhdWx0XCJcblx0XHRAbm9kZUxpbmUuc3RhdGVDeWNsZSBcImNvbGxhcHNlZFwiLCBcImRlZmF1bHRcIlxuXG5cblxuXG5cblxuY2xhc3MgZXhwb3J0cy5EcmFnSGFuZGxlIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdHRoYXQgPSBAb3B0aW9ucy5wXG5cdFx0bGFzdCA9IEBvcHRpb25zLnBsYXN0XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0d2lkdGg6IDIwXG5cdFx0XHRoZWlnaHQ6IDIwXG5cdFx0XHR4OiB0aGF0LnggKyB0aGF0LndpZHRoIC0gMjAgLSBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IHRoYXQueSArIGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdFwiYmFja2dyb3VuZFwiIDogXCJ1cmwoaW1hZ2VzL2RyYWdoYW5kbGUuc3ZnKSAgIG5vLXJlcGVhdFwiXG5cdFx0XHRcdFwiYmFja2dyb3VuZC1wb3NpdGlvblwiOlwibGVmdCBjZW50ZXJcIlxuXHRcdFx0XHRcImJhY2tncm91bmQtc2l6ZVwiIDogXCJjb250YWluXCJcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QC5kcmFnZ2FibGUuZW5hYmxlZCA9IHRydWVcblx0XHRALmRyYWdnYWJsZS5jb25zdHJhaW50cyA9IHtcblx0XHRcdHg6IEAueFxuXHRcdFx0eTogQC55XG5cdFx0XHR3aWR0aDogMFxuXHRcdFx0aGVpZ2h0OiAwXG5cdFx0fVxuXHRcdEAub24gRXZlbnRzLk1vdmUsIC0+XG5cdFx0XHR0aGF0LnggPSBALnggLSB0aGF0LndpZHRoICsgZXhwb3J0cy5wYWRkaW5nICsgMjBcblx0XHRcdHRoYXQueSA9IEAueSAtIGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0dGhhdC5icmluZ1RvRnJvbnQoKVxuXHRcdFx0eTEgPSB0aGF0LmJyaWNrLnNjcmVlbkZyYW1lLnkgKyB0aGF0LmJyaWNrLmhlaWdodC8yICsgZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR4MSA9IHRoYXQuYnJpY2suc2NyZWVuRnJhbWUueCArIHRoYXQuYnJpY2sud2lkdGggLSBleHBvcnRzLnBhZGRpbmcgLSBleHBvcnRzLnNjcm9sbGVkXG5cdFx0XHR4MiA9IHRoYXQubm9kZUxpbmUueDJcblx0XHRcdHRoYXQubm9kZUxpbmUuaHRtbCA9IGRyYXdTVkcoeDEseTEseDIsNTApXG5cblx0XHRcdGlmIGxhc3Rcblx0XHRcdFx0bGFzdHkyID0gQC5zY3JlZW5GcmFtZS55ICsgQC5oZWlnaHQvMlxuXHRcdFx0XHRsYXN0eDIgPSB0aGF0LmJyaWNrLnNjcmVlbkZyYW1lLnggLSBleHBvcnRzLnNjcm9sbGVkXG5cdFx0XHRcdGxhc3R4MSA9IGxhc3Qubm9kZUxpbmUueDFcblx0XHRcdFx0bGFzdHkxID0gbGFzdC5ub2RlTGluZS55MVxuXHRcdFx0XHRsYXN0Lm5vZGVMaW5lLmh0bWwgPSBkcmF3U1ZHKGxhc3R4MSxsYXN0eTEsbGFzdHgyLGxhc3R5MilcblxuXG5jbGFzcyBleHBvcnRzLk5ld1NpdHVhdGlvbiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRAbGFiZWwgPSBuZXcgVGV4dExheWVyXG5cdFx0XHR0ZXh0OiBcIk5ldyBTaXR1YXRpb25cIlxuXHRcdFx0Zm9udFNpemU6IDE2XG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHR0ZXh0VHJhbnNmb3JtOiBcInVwcGVyY2FzZVwiXG5cdFx0XHRmb250V2VpZ2h0OiBcIjcwMFwiXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAyXG5cdFx0XHR4OiAzKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogZXhwb3J0cy5wYWRkaW5nXG5cblxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogZXhwb3J0cy5wcmltYXJ5XG5cdFx0XHRoZWlnaHQ6IDMqZXhwb3J0cy5wYWRkaW5nICsgZXhwb3J0cy5ib3JkZXJyYWRpdXNcblx0XHRcdHdpZHRoOiBleHBvcnRzLnNpdHVhdGlvbldpZHRoXG5cdFx0XHRib3JkZXJSYWRpdXM6IGV4cG9ydHMuYm9yZGVycmFkaXVzXG5cdFx0XHRib3JkZXJXaWR0aDogMVxuXHRcdFx0Ym9yZGVyQ29sb3I6IGV4cG9ydHMucHJpbWFyeUxpZ2h0XG5cdFx0XHR4OiAyKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogMipleHBvcnRzLnBhZGRpbmdcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAbGFiZWwucGFyZW50ID0gQFxuXG5cdFx0QGNvbnRhaW5lciA9IG5ldyBDb250YWluZXJcblx0XHRcdHBhcmVudDogQFxuXG5cdFx0QG5ld0JyaWNrID0gbmV3IEJyaWNrXG5cdFx0XHR5OiAwXG5cdFx0XHRwYXJlbnQ6IEBjb250YWluZXJcblx0XHRcdHRpdGxlOiBcIisgQWRkIG5ldyBicmlja1wiXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUNBQTtBREFBLElBQUEsbUNBQUE7RUFBQTs7OztBQUFBLE9BQU8sQ0FBQyxPQUFSLEdBQWtCOztBQUNsQixPQUFPLENBQUMsY0FBUixHQUF5Qjs7QUFDekIsT0FBTyxDQUFDLFlBQVIsR0FBdUI7O0FBRXZCLE9BQU8sQ0FBQyxPQUFSLEdBQWtCOztBQUNsQixPQUFPLENBQUMsV0FBUixHQUFzQjs7QUFDdEIsT0FBTyxDQUFDLFlBQVIsR0FBdUI7O0FBQ3ZCLE9BQU8sQ0FBQyxTQUFSLEdBQW9COztBQUVwQixPQUFPLENBQUMsUUFBUixHQUFtQjs7QUFFbkIsT0FBTyxDQUFDLFNBQVIsR0FBb0I7O0FBQ3BCLE9BQU8sQ0FBQyxTQUFSLEdBQW9COztBQUVwQixPQUFBLEdBQVUsU0FBQyxFQUFELEVBQUksRUFBSixFQUFPLEVBQVAsRUFBVSxFQUFWO0FBQ1QsTUFBQTtFQUFBLEdBQUEsR0FBTSxvQkFBQSxHQUVVLENBQUEsRUFBQSxHQUFHLEVBQUgsQ0FGVixHQUVtQixRQUZuQixHQUU2QixDQUFBLEVBQUEsR0FBRyxFQUFILENBRjdCLEdBRXNDLG9EQUZ0QyxHQUdRLENBQUcsRUFBRCxHQUFJLEdBQUosR0FBTyxFQUFULENBSFIsR0FHdUIsS0FIdkIsR0FHNkIsQ0FBQSxHQUFBLEdBQUcsQ0FBQyxFQUFBLEdBQUcsQ0FBQyxDQUFDLEVBQUEsR0FBRyxFQUFKLENBQUEsR0FBUSxHQUFULENBQUosQ0FBSCxHQUFxQixHQUFyQixHQUF3QixFQUF4QixHQUEyQixHQUEzQixHQUE2QixDQUFDLEVBQUEsR0FBRyxDQUFDLENBQUMsRUFBQSxHQUFHLEVBQUosQ0FBQSxHQUFRLEdBQVQsQ0FBSixDQUE3QixHQUErQyxHQUEvQyxHQUFrRCxFQUFsRCxHQUFxRCxHQUFyRCxHQUF3RCxFQUF4RCxHQUEyRCxHQUEzRCxHQUE4RCxFQUE5RCxDQUg3QixHQUdpRyxpRUFIakcsR0FJVSxDQUFBLEVBQUEsR0FBRyxFQUFILENBSlYsR0FJbUIsUUFKbkIsR0FJNkIsQ0FBQSxFQUFBLEdBQUcsRUFBSCxDQUo3QixHQUlzQztBQUc1QyxTQUFPO0FBUkU7O0FBVUosT0FBTyxDQUFDOzs7RUFDQSxtQkFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsZUFBQSxFQUFpQixJQUFqQjtNQUNBLEtBQUEsRUFBTyxDQUFBLEdBQUUsT0FBTyxDQUFDLE9BRGpCO01BRUEsQ0FBQSxFQUFHLENBRkg7TUFHQSxnQkFBQSxFQUNDO1FBQUEsSUFBQSxFQUFLLEdBQUw7UUFDQSxLQUFBLEVBQU8sTUFBTSxDQUFDLElBRGQ7T0FKRDtNQU1BLElBQUEsRUFBTSxPQUFBLENBQVEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxFQUFqQixFQUFvQixJQUFDLENBQUEsT0FBTyxDQUFDLEVBQTdCLEVBQWdDLElBQUMsQ0FBQSxPQUFPLENBQUMsRUFBekMsRUFBNEMsRUFBNUMsQ0FOTjtLQUREO0lBUUEsMkNBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxJQUFDLENBQUEsRUFBRCxHQUFNLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFDZixJQUFDLENBQUEsRUFBRCxHQUFNLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFDZixJQUFDLENBQUEsRUFBRCxHQUFNLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFDZixJQUFDLENBQUMsTUFBTSxDQUFDLFNBQVQsR0FDQztNQUFBLENBQUEsRUFBRyxDQUFBLEdBQUUsT0FBTyxDQUFDLE9BQWI7TUFDQSxNQUFBLEVBQVEsQ0FEUjtNQUVBLE1BQUEsRUFBUSxDQUZSO01BR0EsT0FBQSxFQUFTLENBSFQ7O0VBaEJXOzs7O0dBRGtCOztBQXdCMUI7OztFQUNRLGtCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUztJQUV0QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxlQUFBLEVBQWlCLGFBQWpCO01BQ0EsWUFBQSxFQUFjLE9BQU8sQ0FBQyxZQUR0QjtNQUVBLFdBQUEsRUFBYSxDQUZiO01BR0EsV0FBQSxFQUFhLE9BQU8sQ0FBQyxZQUhyQjtNQUlBLEtBQUEsRUFBTyxPQUFPLENBQUMsY0FBUixHQUF5QixDQUFBLEdBQUUsT0FBTyxDQUFDLE9BSjFDO01BS0EsTUFBQSxFQUFRLEVBTFI7TUFNQSxDQUFBLEVBQUcsT0FBTyxDQUFDLE9BTlg7TUFPQSxDQUFBLEVBQUcsQ0FBQSxHQUFFLE9BQU8sQ0FBQyxPQVBiO0tBREQ7SUFVQSwwQ0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLElBQUMsQ0FBQSxLQUFELEdBQWEsSUFBQSxTQUFBLENBQ1o7TUFBQSxNQUFBLEVBQVEsSUFBUjtNQUNBLElBQUEsRUFBTSxnQkFETjtNQUVBLFFBQUEsRUFBVSxFQUZWO01BR0EsS0FBQSxFQUFPLE9BSFA7TUFJQSxLQUFBLEVBQU8sS0FBSyxDQUFDLE1BSmI7S0FEWTtFQWREOzs7O0dBRFM7O0FBdUJqQjs7O0VBQ1EsZUFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsZUFBQSxFQUFpQixPQUFPLENBQUMsT0FBekI7TUFDQSxNQUFBLEVBQVEsR0FEUjtNQUVBLEtBQUEsRUFBTyxPQUFPLENBQUMsY0FGZjtNQUdBLENBQUEsRUFBRyxDQUhIO01BSUEsV0FBQSxFQUFhLENBSmI7TUFLQSxZQUFBLEVBQWMsT0FBTyxDQUFDLFlBQVIsR0FBcUIsQ0FMbkM7TUFNQSxXQUFBLEVBQWEsT0FBTyxDQUFDLFlBTnJCO0tBREQ7SUFTQSxJQUFDLENBQUEsS0FBRCxHQUFhLElBQUEsU0FBQSxDQUNaO01BQUEsSUFBQSxFQUFNLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBZjtNQUNBLFFBQUEsRUFBVSxFQURWO01BRUEsS0FBQSxFQUFPLE9BRlA7TUFHQSxDQUFBLEVBQUcsT0FBTyxDQUFDLE9BSFg7TUFJQSxDQUFBLEVBQUcsT0FBTyxDQUFDLE9BSlg7S0FEWTtJQU9iLHVDQUFNLElBQUMsQ0FBQSxPQUFQO0lBRUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxNQUFQLEdBQWdCO0VBcEJKOzs7O0dBRE07O0FBMkJkOzs7RUFDUSxtQkFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsZUFBQSxFQUFpQixJQUFqQjtNQUNBLENBQUEsRUFBRyxDQUFBLEdBQUUsT0FBTyxDQUFDLE9BRGI7TUFFQSxnQkFBQSxFQUNDO1FBQUEsSUFBQSxFQUFLLEdBQUw7UUFDQSxLQUFBLEVBQU8sTUFBTSxDQUFDLElBRGQ7T0FIRDtLQUREO0lBT0EsMkNBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxJQUFDLENBQUEsVUFBRCxHQUFrQixJQUFBLGVBQUEsQ0FDakI7TUFBQSxNQUFBLEVBQVEsSUFBUjtNQUNBLEtBQUEsRUFBTyxPQUFPLENBQUMsY0FEZjtNQUVBLGVBQUEsRUFBaUIsYUFGakI7TUFHQSxnQkFBQSxFQUFrQixLQUhsQjtNQUlBLFFBQUEsRUFBVSxJQUpWO0tBRGlCO0lBT2xCLElBQUMsQ0FBQSxVQUFVLENBQUMsaUJBQVosR0FBZ0M7SUFHaEMsSUFBQyxDQUFDLE1BQU0sQ0FBQyxTQUFULEdBQ0M7TUFBQSxDQUFBLEVBQUcsQ0FBQSxHQUFFLE9BQU8sQ0FBQyxPQUFiO01BQ0EsTUFBQSxFQUFRLENBRFI7TUFFQSxNQUFBLEVBQVEsQ0FGUjtNQUdBLE9BQUEsRUFBUyxDQUhUOztFQXRCVzs7OztHQURVOztBQWdDbEIsT0FBTyxDQUFDOzs7RUFDQSxtQkFBQyxPQUFEO0FBRVosUUFBQTtJQUZhLElBQUMsQ0FBQSw0QkFBRCxVQUFTOztJQUV0QixJQUFDLENBQUEsS0FBRCxHQUFhLElBQUEsU0FBQSxDQUNaO01BQUEsSUFBQSxFQUFNLElBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBZjtNQUNBLFFBQUEsRUFBVSxFQURWO01BRUEsS0FBQSxFQUFPLE9BRlA7TUFHQSxhQUFBLEVBQWUsV0FIZjtNQUlBLFVBQUEsRUFBWSxLQUpaO01BS0EsYUFBQSxFQUFlLENBTGY7TUFNQSxDQUFBLEVBQUcsQ0FBQSxHQUFFLE9BQU8sQ0FBQyxPQU5iO01BT0EsQ0FBQSxFQUFHLE9BQU8sQ0FBQyxPQVBYO0tBRFk7SUFVYixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxlQUFBLEVBQWlCLE9BQU8sQ0FBQyxPQUF6QjtNQUNBLE1BQUEsRUFBUSxDQUFBLEdBQUUsT0FBTyxDQUFDLE9BQVYsR0FBb0IsT0FBTyxDQUFDLFlBRHBDO01BRUEsS0FBQSxFQUFPLE9BQU8sQ0FBQyxjQUZmO01BR0EsWUFBQSxFQUFjLE9BQU8sQ0FBQyxZQUh0QjtNQUlBLFdBQUEsRUFBYSxDQUpiO01BS0EsV0FBQSxFQUFhLE9BQU8sQ0FBQyxZQUxyQjtNQU1BLENBQUEsRUFBRyxDQUFBLEdBQUUsT0FBTyxDQUFDLE9BTmI7TUFPQSxDQUFBLEVBQUcsQ0FBQSxHQUFFLE9BQU8sQ0FBQyxPQVBiO0tBREQ7SUFVQSwyQ0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBUCxHQUFnQjtJQUVoQixJQUFDLENBQUEsU0FBRCxHQUFpQixJQUFBLFNBQUEsQ0FDaEI7TUFBQSxNQUFBLEVBQVEsSUFBUjtLQURnQjtJQUdqQixNQUFBLEdBQVM7QUFDVDtBQUFBLFNBQUEsNkNBQUE7O01BQ0MsTUFBTSxDQUFDLElBQVAsQ0FBZ0IsSUFBQSxLQUFBLENBQ2Y7UUFBQSxDQUFBLEVBQUcsQ0FBQSxHQUFFLEdBQUw7UUFDQSxNQUFBLEVBQVEsSUFBQyxDQUFBLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FEOUI7UUFFQSxLQUFBLEVBQU8sS0FGUDtPQURlLENBQWhCO0FBREQ7SUFNQSxNQUFNLENBQUMsSUFBUCxDQUFnQixJQUFBLEtBQUEsQ0FDZjtNQUFBLENBQUEsRUFBRyxNQUFNLENBQUMsTUFBUCxHQUFjLEdBQWpCO01BQ0EsTUFBQSxFQUFRLElBQUMsQ0FBQSxTQUFTLENBQUMsVUFBVSxDQUFDLE9BRDlCO01BRUEsS0FBQSxFQUFPLGlCQUZQO0tBRGUsQ0FBaEI7SUFLQSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQWxCLENBQTJCLElBQUEsUUFBQSxDQUMxQjtNQUFBLE1BQUEsRUFBUSxNQUFPLENBQUEsTUFBTSxDQUFDLE1BQVAsR0FBYyxDQUFkLENBQWY7TUFDQSxJQUFBLEVBQU0sVUFETjtLQUQwQixDQUEzQjtJQUlBLElBQUMsQ0FBQSxLQUFELEdBQVMsTUFBTyxDQUFBLE1BQU0sQ0FBQyxNQUFQLEdBQWMsQ0FBZDtJQUVoQixJQUFJLElBQUMsQ0FBQSxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUE5QixHQUF1QyxHQUEzQztNQUNDLElBQUMsQ0FBQSxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQXRCLEdBQStCLElBQUMsQ0FBQSxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUQ5RDtLQUFBLE1BQUE7TUFHQyxJQUFDLENBQUEsU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUF0QixHQUErQixJQUhoQzs7SUFLQSxJQUFDLENBQUEsR0FBRCxHQUFXLElBQUEsS0FBQSxDQUNWO01BQUEsTUFBQSxFQUFRLElBQVI7TUFDQSxLQUFBLEVBQU8sRUFEUDtNQUVBLE1BQUEsRUFBUSxFQUZSO01BR0EsQ0FBQSxFQUFFLE9BQU8sQ0FBQyxPQUhWO01BSUEsQ0FBQSxFQUFHLE9BQU8sQ0FBQyxPQUpYO01BS0EsS0FBQSxFQUNDO1FBQUEsWUFBQSxFQUFlLGlDQUFmO1FBQ0EscUJBQUEsRUFBc0IsYUFEdEI7UUFFQSxpQkFBQSxFQUFvQixTQUZwQjtPQU5EO01BU0EsZ0JBQUEsRUFDQztRQUFBLElBQUEsRUFBSyxHQUFMO1FBQ0EsS0FBQSxFQUFPLE1BQU0sQ0FBQyxJQURkO09BVkQ7S0FEVTtJQWNYLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVosR0FDQztNQUFBLFFBQUEsRUFBVSxDQUFDLEVBQVg7O0lBR0QsSUFBQyxDQUFBLFFBQUQsR0FBZ0IsSUFBQSxPQUFPLENBQUMsU0FBUixDQUNmO01BQUEsTUFBQSxFQUFTLElBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBbEI7TUFDQSxDQUFBLEVBQUcsQ0FESDtNQUVBLENBQUEsRUFBRyxDQUZIO01BR0EsS0FBQSxFQUFPLE1BQU0sQ0FBQyxLQUhkO01BSUEsTUFBQSxFQUFRLE1BQU0sQ0FBQyxNQUpmO01BS0EsRUFBQSxFQUFJLElBQUMsQ0FBQSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQW5CLEdBQXVCLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBUCxHQUFjLENBQXJDLEdBQXlDLE9BQU8sQ0FBQyxPQUxyRDtNQU1BLEVBQUEsRUFBSSxJQUFDLENBQUMsQ0FBRixHQUFNLElBQUMsQ0FBQyxLQUFSLEdBQWdCLE9BQU8sQ0FBQyxPQU41QjtNQU9BLEVBQUEsRUFBSSxJQUFDLENBQUMsQ0FBRixHQUFNLElBQUMsQ0FBQyxLQUFSLEdBQWdCLENBQUEsR0FBRSxPQUFPLENBQUMsT0FQOUI7S0FEZTtJQVVoQixPQUFPLENBQUMsU0FBUyxDQUFDLElBQWxCLENBQXVCLElBQUMsQ0FBQSxRQUF4QjtJQUVBLElBQUMsQ0FBQSxHQUFHLENBQUMsT0FBTCxDQUFhLElBQUMsQ0FBQSxNQUFkO0VBbEZZOztzQkFvRmIsTUFBQSxHQUFRLFNBQUE7SUFDUCxJQUFDLENBQUEsU0FBUyxDQUFDLFVBQVgsQ0FBc0IsV0FBdEIsRUFBbUMsU0FBbkM7SUFDQSxJQUFDLENBQUEsR0FBRyxDQUFDLFVBQUwsQ0FBZ0IsV0FBaEIsRUFBNkIsU0FBN0I7V0FDQSxJQUFDLENBQUEsUUFBUSxDQUFDLFVBQVYsQ0FBcUIsV0FBckIsRUFBa0MsU0FBbEM7RUFITzs7OztHQXJGdUI7O0FBK0YxQixPQUFPLENBQUM7OztFQUNBLG9CQUFDLE9BQUQ7QUFFWixRQUFBO0lBRmEsSUFBQyxDQUFBLDRCQUFELFVBQVM7SUFFdEIsSUFBQSxHQUFPLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFDaEIsSUFBQSxHQUFPLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFFaEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsS0FBQSxFQUFPLEVBQVA7TUFDQSxNQUFBLEVBQVEsRUFEUjtNQUVBLENBQUEsRUFBRyxJQUFJLENBQUMsQ0FBTCxHQUFTLElBQUksQ0FBQyxLQUFkLEdBQXNCLEVBQXRCLEdBQTJCLE9BQU8sQ0FBQyxPQUZ0QztNQUdBLENBQUEsRUFBRyxJQUFJLENBQUMsQ0FBTCxHQUFTLE9BQU8sQ0FBQyxPQUhwQjtNQUlBLEtBQUEsRUFDQztRQUFBLFlBQUEsRUFBZSx3Q0FBZjtRQUNBLHFCQUFBLEVBQXNCLGFBRHRCO1FBRUEsaUJBQUEsRUFBb0IsU0FGcEI7T0FMRDtLQUREO0lBVUEsNENBQU0sSUFBQyxDQUFBLE9BQVA7SUFDQSxJQUFDLENBQUMsU0FBUyxDQUFDLE9BQVosR0FBc0I7SUFDdEIsSUFBQyxDQUFDLFNBQVMsQ0FBQyxXQUFaLEdBQTBCO01BQ3pCLENBQUEsRUFBRyxJQUFDLENBQUMsQ0FEb0I7TUFFekIsQ0FBQSxFQUFHLElBQUMsQ0FBQyxDQUZvQjtNQUd6QixLQUFBLEVBQU8sQ0FIa0I7TUFJekIsTUFBQSxFQUFRLENBSmlCOztJQU0xQixJQUFDLENBQUMsRUFBRixDQUFLLE1BQU0sQ0FBQyxJQUFaLEVBQWtCLFNBQUE7QUFDakIsVUFBQTtNQUFBLElBQUksQ0FBQyxDQUFMLEdBQVMsSUFBQyxDQUFDLENBQUYsR0FBTSxJQUFJLENBQUMsS0FBWCxHQUFtQixPQUFPLENBQUMsT0FBM0IsR0FBcUM7TUFDOUMsSUFBSSxDQUFDLENBQUwsR0FBUyxJQUFDLENBQUMsQ0FBRixHQUFNLE9BQU8sQ0FBQztNQUN2QixJQUFJLENBQUMsWUFBTCxDQUFBO01BQ0EsRUFBQSxHQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQXZCLEdBQTJCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBWCxHQUFrQixDQUE3QyxHQUFpRCxPQUFPLENBQUM7TUFDOUQsRUFBQSxHQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQXZCLEdBQTJCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBdEMsR0FBOEMsT0FBTyxDQUFDLE9BQXRELEdBQWdFLE9BQU8sQ0FBQztNQUM3RSxFQUFBLEdBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztNQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQWQsR0FBcUIsT0FBQSxDQUFRLEVBQVIsRUFBVyxFQUFYLEVBQWMsRUFBZCxFQUFpQixFQUFqQjtNQUVyQixJQUFHLElBQUg7UUFDQyxNQUFBLEdBQVMsSUFBQyxDQUFDLFdBQVcsQ0FBQyxDQUFkLEdBQWtCLElBQUMsQ0FBQyxNQUFGLEdBQVM7UUFDcEMsTUFBQSxHQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQXZCLEdBQTJCLE9BQU8sQ0FBQztRQUM1QyxNQUFBLEdBQVMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixNQUFBLEdBQVMsSUFBSSxDQUFDLFFBQVEsQ0FBQztlQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQWQsR0FBcUIsT0FBQSxDQUFRLE1BQVIsRUFBZSxNQUFmLEVBQXNCLE1BQXRCLEVBQTZCLE1BQTdCLEVBTHRCOztJQVRpQixDQUFsQjtFQXZCWTs7OztHQURtQjs7QUF5QzNCLE9BQU8sQ0FBQzs7O0VBQ0Esc0JBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTO0lBRXRCLElBQUMsQ0FBQSxLQUFELEdBQWEsSUFBQSxTQUFBLENBQ1o7TUFBQSxJQUFBLEVBQU0sZUFBTjtNQUNBLFFBQUEsRUFBVSxFQURWO01BRUEsS0FBQSxFQUFPLE9BRlA7TUFHQSxhQUFBLEVBQWUsV0FIZjtNQUlBLFVBQUEsRUFBWSxLQUpaO01BS0EsYUFBQSxFQUFlLENBTGY7TUFNQSxDQUFBLEVBQUcsQ0FBQSxHQUFFLE9BQU8sQ0FBQyxPQU5iO01BT0EsQ0FBQSxFQUFHLE9BQU8sQ0FBQyxPQVBYO0tBRFk7SUFZYixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxlQUFBLEVBQWlCLE9BQU8sQ0FBQyxPQUF6QjtNQUNBLE1BQUEsRUFBUSxDQUFBLEdBQUUsT0FBTyxDQUFDLE9BQVYsR0FBb0IsT0FBTyxDQUFDLFlBRHBDO01BRUEsS0FBQSxFQUFPLE9BQU8sQ0FBQyxjQUZmO01BR0EsWUFBQSxFQUFjLE9BQU8sQ0FBQyxZQUh0QjtNQUlBLFdBQUEsRUFBYSxDQUpiO01BS0EsV0FBQSxFQUFhLE9BQU8sQ0FBQyxZQUxyQjtNQU1BLENBQUEsRUFBRyxDQUFBLEdBQUUsT0FBTyxDQUFDLE9BTmI7TUFPQSxDQUFBLEVBQUcsQ0FBQSxHQUFFLE9BQU8sQ0FBQyxPQVBiO0tBREQ7SUFVQSw4Q0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBUCxHQUFnQjtJQUVoQixJQUFDLENBQUEsU0FBRCxHQUFpQixJQUFBLFNBQUEsQ0FDaEI7TUFBQSxNQUFBLEVBQVEsSUFBUjtLQURnQjtJQUdqQixJQUFDLENBQUEsUUFBRCxHQUFnQixJQUFBLEtBQUEsQ0FDZjtNQUFBLENBQUEsRUFBRyxDQUFIO01BQ0EsTUFBQSxFQUFRLElBQUMsQ0FBQSxTQURUO01BRUEsS0FBQSxFQUFPLGlCQUZQO0tBRGU7RUEvQko7Ozs7R0FEcUIifQ==
