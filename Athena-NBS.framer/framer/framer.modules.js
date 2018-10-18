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
      x1 = that.brick.screenFrame.x + that.brick.width - exports.padding - exports.scrolled;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbm9zL1NpdGVzL0F0aGVuYS1OQlMvQXRoZW5hLU5CUy5mcmFtZXIvbW9kdWxlcy9uYnMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzLnBhZGRpbmcgPSAxNVxuZXhwb3J0cy5zaXR1YXRpb25XaWR0aCA9IDMwMFxuZXhwb3J0cy5ib3JkZXJyYWRpdXMgPSA0XG5cbmV4cG9ydHMucHJpbWFyeSA9IFwiIzAwMjAzRFwiXG5leHBvcnRzLnByaW1hcnlEYXJrID0gXCIjMTExNTFBXCJcbmV4cG9ydHMucHJpbWFyeUxpZ2h0ID0gXCIjMkE0NDVDXCJcbmV4cG9ydHMuc2Vjb25kYXJ5ID0gXCIjQ0MwMDI2XCJcblxuZXhwb3J0cy5zY3JvbGxlZCA9IDBcblxuZXhwb3J0cy5saXN0ZW5lcnMgPSBbXVxuZXhwb3J0cy5ub2RlTGlua3MgPSBbXVxuXG5kcmF3U1ZHID0gKHgxLHkxLHgyLHkyKSAtPlxuXHRzdmcgPSAnXG5cdDxzdmc+XG5cdFx0PGNpcmNsZSBjeD1cIicrIFwiI3t4MX1cIiArJ1wiIGN5PVwiJysgXCIje3kxfVwiICsnXCIgcj1cIjRcIiBzdHJva2U9XCJub25lXCIgZmlsbD1cIiNGRkZGRkZcIiAvPlxuXHRcdDxwYXRoIGQ9XCJNJysgXCIje3gxfSAje3kxfVwiICsnIEMgJytcIiAje3gxKygoeDIteDEpKjAuNSl9ICN7eTF9ICN7eDErKCh4Mi14MSkqMC41KX0gI3t5Mn0gI3t4Mn0gI3t5Mn1cIiArJ1wiIHN0cm9rZT1cIiNGRkZGRkZcIiBzdHJva2Utd2lkdGg9XCIyXCIgZmlsbD1cIm5vbmVcIiAvPlxuXHRcdDxjaXJjbGUgY3g9XCInKyBcIiN7eDJ9XCIgKydcIiBjeT1cIicrIFwiI3t5Mn1cIiArJ1wiIHI9XCI0XCIgc3Ryb2tlPVwibm9uZVwiIGZpbGw9XCIjRkZGRkZGXCIgLz5cblx0PC9zdmc+XG5cdCdcblx0cmV0dXJuIHN2Z1xuXG5jbGFzcyBleHBvcnRzLk5vZGVMaW5lcyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR3aWR0aDogMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IDBcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6MC4yXG5cdFx0XHRcdGN1cnZlOiBCZXppZXIuZWFzZVxuXHRcdFx0aHRtbDogZHJhd1NWRyhAb3B0aW9ucy54MSxAb3B0aW9ucy55MSxAb3B0aW9ucy54Miw1MClcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHgyID0gQG9wdGlvbnMueDJcblx0XHRALnN0YXRlcy5jb2xsYXBzZWQ9XG5cdFx0XHR5OiAzKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0c2NhbGVZOiAwXG5cdFx0XHRoZWlnaHQ6IDBcblx0XHRcdG9wYWNpdHk6IDBcblxuXG5cbmNsYXNzIExpc3RlbmVyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCdcblx0XHRcdGJvcmRlclJhZGl1czogZXhwb3J0cy5ib3JkZXJyYWRpdXNcblx0XHRcdGJvcmRlcldpZHRoOiAxXG5cdFx0XHRib3JkZXJDb2xvcjogZXhwb3J0cy5wcmltYXJ5TGlnaHRcblx0XHRcdHdpZHRoOiBleHBvcnRzLnNpdHVhdGlvbldpZHRoIC0gMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdGhlaWdodDogNDBcblx0XHRcdHg6IGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogMypleHBvcnRzLnBhZGRpbmdcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAbGFiZWwgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHRleHQ6IFwiRXZlbnQgTGlzdGVuZXJcIlxuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRwb2ludDogQWxpZ24uY2VudGVyXG5cblxuY2xhc3MgQnJpY2sgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogZXhwb3J0cy5wcmltYXJ5XG5cdFx0XHRoZWlnaHQ6IDEwMFxuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGhcblx0XHRcdHg6IDBcblx0XHRcdGJvcmRlcldpZHRoOiAxXG5cdFx0XHRib3JkZXJSYWRpdXM6IGV4cG9ydHMuYm9yZGVycmFkaXVzLzJcblx0XHRcdGJvcmRlckNvbG9yOiBleHBvcnRzLnByaW1hcnlMaWdodFxuXG5cdFx0QGxhYmVsID0gbmV3IFRleHRMYXllclxuXHRcdFx0dGV4dDogQG9wdGlvbnMudGl0bGVcblx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0eDogZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAbGFiZWwucGFyZW50ID0gQFxuXG5cblxuXG5cbmNsYXNzIENvbnRhaW5lciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR5OiAzKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTowLjJcblx0XHRcdFx0Y3VydmU6IEJlemllci5lYXNlXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHNjcm9sbENvbXAgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiBleHBvcnRzLnNpdHVhdGlvbldpZHRoXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCdcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRvdmVyZHJhZzogdHJ1ZVxuXG5cdFx0QHNjcm9sbENvbXAubW91c2VXaGVlbEVuYWJsZWQgPSB0cnVlXG5cblxuXHRcdEAuc3RhdGVzLmNvbGxhcHNlZD1cblx0XHRcdHk6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRzY2FsZVk6IDBcblx0XHRcdGhlaWdodDogMFxuXHRcdFx0b3BhY2l0eTogMFxuXG5cblxuXG5cbmNsYXNzIGV4cG9ydHMuU2l0dWF0aW9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IEBvcHRpb25zLmxcblx0XHRcdGZvbnRTaXplOiAxNlxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0dGV4dFRyYW5zZm9ybTogXCJ1cHBlcmNhc2VcIlxuXHRcdFx0Zm9udFdlaWdodDogXCI3MDBcIlxuXHRcdFx0bGV0dGVyU3BhY2luZzogMlxuXHRcdFx0eDogMypleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IGV4cG9ydHMucGFkZGluZ1xuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogZXhwb3J0cy5wcmltYXJ5XG5cdFx0XHRoZWlnaHQ6IDMqZXhwb3J0cy5wYWRkaW5nICsgZXhwb3J0cy5ib3JkZXJyYWRpdXNcblx0XHRcdHdpZHRoOiBleHBvcnRzLnNpdHVhdGlvbldpZHRoXG5cdFx0XHRib3JkZXJSYWRpdXM6IGV4cG9ydHMuYm9yZGVycmFkaXVzXG5cdFx0XHRib3JkZXJXaWR0aDogMVxuXHRcdFx0Ym9yZGVyQ29sb3I6IGV4cG9ydHMucHJpbWFyeUxpZ2h0XG5cdFx0XHR4OiAyKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogMipleHBvcnRzLnBhZGRpbmdcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAbGFiZWwucGFyZW50ID0gQFxuXG5cdFx0QGNvbnRhaW5lciA9IG5ldyBDb250YWluZXJcblx0XHRcdHBhcmVudDogQFxuXG5cdFx0YnJpY2tzID0gW11cblx0XHRmb3IgY2hpbGQsIGkgaW4gQG9wdGlvbnMubm9kZXNcblx0XHRcdGJyaWNrcy5wdXNoIG5ldyBCcmlja1xuXHRcdFx0XHR5OiBpKjEwMFxuXHRcdFx0XHRwYXJlbnQ6IEBjb250YWluZXIuc2Nyb2xsQ29tcC5jb250ZW50XG5cdFx0XHRcdHRpdGxlOiBjaGlsZFxuXG5cdFx0YnJpY2tzLnB1c2ggbmV3IEJyaWNrXG5cdFx0XHR5OiBicmlja3MubGVuZ3RoKjEwMFxuXHRcdFx0cGFyZW50OiBAY29udGFpbmVyLnNjcm9sbENvbXAuY29udGVudFxuXHRcdFx0dGl0bGU6IFwiKyBBZGQgbmV3IGJyaWNrXCJcblxuXHRcdGV4cG9ydHMubGlzdGVuZXJzLnB1c2ggbmV3IExpc3RlbmVyXG5cdFx0XHRwYXJlbnQ6IGJyaWNrc1ticmlja3MubGVuZ3RoLTJdXG5cdFx0XHRuYW1lOiBcIkxpc3RlbmVyXCJcblxuXHRcdEBicmljayA9IGJyaWNrc1ticmlja3MubGVuZ3RoLTJdXG5cblx0XHRpZiAoQGNvbnRhaW5lci5zY3JvbGxDb21wLmNvbnRlbnQuaGVpZ2h0IDwgNjIwKVxuXHRcdFx0QGNvbnRhaW5lci5zY3JvbGxDb21wLmhlaWdodCA9IEBjb250YWluZXIuc2Nyb2xsQ29tcC5jb250ZW50LmhlaWdodFxuXHRcdGVsc2Vcblx0XHRcdEBjb250YWluZXIuc2Nyb2xsQ29tcC5oZWlnaHQgPSA2MjBcblxuXHRcdEB0cmkgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IDIwXG5cdFx0XHRoZWlnaHQ6IDIwXG5cdFx0XHR4OmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0XCJiYWNrZ3JvdW5kXCIgOiBcInVybChpbWFnZXMvdHJpLnN2ZykgICBuby1yZXBlYXRcIlxuXHRcdFx0XHRcImJhY2tncm91bmQtcG9zaXRpb25cIjpcImxlZnQgY2VudGVyXCJcblx0XHRcdFx0XCJiYWNrZ3JvdW5kLXNpemVcIiA6IFwiY29udGFpblwiXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOjAuMlxuXHRcdFx0XHRjdXJ2ZTogQmV6aWVyLmVhc2VcblxuXHRcdEB0cmkuc3RhdGVzLmNvbGxhcHNlZD1cblx0XHRcdHJvdGF0aW9uOiAtOTBcblxuXG5cdFx0QG5vZGVMaW5lID0gbmV3IGV4cG9ydHMuTm9kZUxpbmVzXG5cdFx0XHRwYXJlbnQgOiBAb3B0aW9ucy5wXG5cdFx0XHR4OiAwI0AueCArIEAud2lkdGggLSBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IDAjMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdHdpZHRoOiBzY3JlZW4ud2lkdGhcblx0XHRcdGhlaWdodDogc2NyZWVuLmhlaWdodFxuXHRcdFx0eTE6IEBicmljay5zY3JlZW5GcmFtZS55ICsgQGJyaWNrLmhlaWdodC8yICsgZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR4MTogQC54ICsgQC53aWR0aCAtIGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eDI6IEAueCArIEAud2lkdGggKyAyKmV4cG9ydHMucGFkZGluZ1xuXG5cdFx0ZXhwb3J0cy5ub2RlTGlua3MucHVzaCBAbm9kZUxpbmVcblxuXHRcdEB0cmkub25DbGljayBAVG9nZ2xlXG5cblx0VG9nZ2xlOiA9PlxuXHRcdEBjb250YWluZXIuc3RhdGVDeWNsZSBcImNvbGxhcHNlZFwiLCBcImRlZmF1bHRcIlxuXHRcdEB0cmkuc3RhdGVDeWNsZSBcImNvbGxhcHNlZFwiLCBcImRlZmF1bHRcIlxuXHRcdEBub2RlTGluZS5zdGF0ZUN5Y2xlIFwiY29sbGFwc2VkXCIsIFwiZGVmYXVsdFwiXG5cblxuXG5cblxuXG5jbGFzcyBleHBvcnRzLkRyYWdIYW5kbGUgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0dGhhdCA9IEBvcHRpb25zLnBcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR3aWR0aDogMjBcblx0XHRcdGhlaWdodDogMjBcblx0XHRcdHg6IHRoYXQueCArIHRoYXQud2lkdGggLSAyMCAtIGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogdGhhdC55ICsgZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0XCJiYWNrZ3JvdW5kXCIgOiBcInVybChpbWFnZXMvZHJhZ2hhbmRsZS5zdmcpICAgbm8tcmVwZWF0XCJcblx0XHRcdFx0XCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCI6XCJsZWZ0IGNlbnRlclwiXG5cdFx0XHRcdFwiYmFja2dyb3VuZC1zaXplXCIgOiBcImNvbnRhaW5cIlxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRALmRyYWdnYWJsZS5lbmFibGVkID0gdHJ1ZVxuXHRcdEAuZHJhZ2dhYmxlLmNvbnN0cmFpbnRzID0ge1xuXHRcdFx0eDogQC54XG5cdFx0XHR5OiBALnlcblx0XHRcdHdpZHRoOiAwXG5cdFx0XHRoZWlnaHQ6IDBcblx0XHR9XG5cdFx0QC5vbiBFdmVudHMuTW92ZSwgLT5cblx0XHRcdHRoYXQueCA9IEAueCAtIHRoYXQud2lkdGggKyBleHBvcnRzLnBhZGRpbmcgKyAyMFxuXHRcdFx0dGhhdC55ID0gQC55IC0gZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR0aGF0LmJyaW5nVG9Gcm9udCgpXG5cdFx0XHR5MSA9IHRoYXQuYnJpY2suc2NyZWVuRnJhbWUueSArIHRoYXQuYnJpY2suaGVpZ2h0LzIgKyBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHgxID0gdGhhdC5icmljay5zY3JlZW5GcmFtZS54ICsgdGhhdC5icmljay53aWR0aCAtIGV4cG9ydHMucGFkZGluZyAtIGV4cG9ydHMuc2Nyb2xsZWRcblx0XHRcdHgyID0gdGhhdC5ub2RlTGluZS54MlxuXHRcdFx0eHggPSB0aGF0LmJyaWNrLnNjcmVlbkZyYW1lLnggKyB0aGF0LmJyaWNrLndpZHRoXG5cdFx0XHR0aGF0Lm5vZGVMaW5lLmh0bWwgPSBkcmF3U1ZHKHgxLHkxLHgyLDUwKVxuXG5cbmNsYXNzIGV4cG9ydHMuTmV3U2l0dWF0aW9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IFwiTmV3IFNpdHVhdGlvblwiXG5cdFx0XHRmb250U2l6ZTogMTZcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdHRleHRUcmFuc2Zvcm06IFwidXBwZXJjYXNlXCJcblx0XHRcdGZvbnRXZWlnaHQ6IFwiNzAwXCJcblx0XHRcdGxldHRlclNwYWNpbmc6IDJcblx0XHRcdHg6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblxuXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBleHBvcnRzLnByaW1hcnlcblx0XHRcdGhlaWdodDogMypleHBvcnRzLnBhZGRpbmcgKyBleHBvcnRzLmJvcmRlcnJhZGl1c1xuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGhcblx0XHRcdGJvcmRlclJhZGl1czogZXhwb3J0cy5ib3JkZXJyYWRpdXNcblx0XHRcdGJvcmRlcldpZHRoOiAxXG5cdFx0XHRib3JkZXJDb2xvcjogZXhwb3J0cy5wcmltYXJ5TGlnaHRcblx0XHRcdHg6IDIqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAyKmV4cG9ydHMucGFkZGluZ1xuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBsYWJlbC5wYXJlbnQgPSBAXG5cblx0XHRAY29udGFpbmVyID0gbmV3IENvbnRhaW5lclxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHRAbmV3QnJpY2sgPSBuZXcgQnJpY2tcblx0XHRcdHk6IDBcblx0XHRcdHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0dGl0bGU6IFwiKyBBZGQgbmV3IGJyaWNrXCJcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQ0FBO0FEQUEsSUFBQSxtQ0FBQTtFQUFBOzs7O0FBQUEsT0FBTyxDQUFDLE9BQVIsR0FBa0I7O0FBQ2xCLE9BQU8sQ0FBQyxjQUFSLEdBQXlCOztBQUN6QixPQUFPLENBQUMsWUFBUixHQUF1Qjs7QUFFdkIsT0FBTyxDQUFDLE9BQVIsR0FBa0I7O0FBQ2xCLE9BQU8sQ0FBQyxXQUFSLEdBQXNCOztBQUN0QixPQUFPLENBQUMsWUFBUixHQUF1Qjs7QUFDdkIsT0FBTyxDQUFDLFNBQVIsR0FBb0I7O0FBRXBCLE9BQU8sQ0FBQyxRQUFSLEdBQW1COztBQUVuQixPQUFPLENBQUMsU0FBUixHQUFvQjs7QUFDcEIsT0FBTyxDQUFDLFNBQVIs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
