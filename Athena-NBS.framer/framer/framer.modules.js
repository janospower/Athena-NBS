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
      y: 0,
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
        "background": "url(images/Icons/drag.svg)   no-repeat",
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
    this.newBrick.onClick(function() {
      var brickName;
      brickName = prompt("Brick Name");
      return print(brickName);
    });
  }

  return NewSituation;

})(Layer);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbm9zL1NpdGVzL0F0aGVuYS1OQlMvQXRoZW5hLU5CUy5mcmFtZXIvbW9kdWxlcy9uYnMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzLnBhZGRpbmcgPSAxNVxuZXhwb3J0cy5zaXR1YXRpb25XaWR0aCA9IDMwMFxuZXhwb3J0cy5ib3JkZXJyYWRpdXMgPSA0XG5cbmV4cG9ydHMucHJpbWFyeSA9IFwiIzAwMjAzRFwiXG5leHBvcnRzLnByaW1hcnlEYXJrID0gXCIjMTExNTFBXCJcbmV4cG9ydHMucHJpbWFyeUxpZ2h0ID0gXCIjMkE0NDVDXCJcbmV4cG9ydHMuc2Vjb25kYXJ5ID0gXCIjQ0MwMDI2XCJcblxuZXhwb3J0cy5zY3JvbGxlZCA9IDBcblxuZXhwb3J0cy5saXN0ZW5lcnMgPSBbXVxuZXhwb3J0cy5ub2RlTGlua3MgPSBbXVxuXG5kcmF3U1ZHID0gKHgxLHkxLHgyLHkyKSAtPlxuXHRzdmcgPSAnXG5cdDxzdmc+XG5cdFx0PGNpcmNsZSBjeD1cIicrIFwiI3t4MX1cIiArJ1wiIGN5PVwiJysgXCIje3kxfVwiICsnXCIgcj1cIjRcIiBzdHJva2U9XCJub25lXCIgZmlsbD1cIiNGRkZGRkZcIiAvPlxuXHRcdDxwYXRoIGQ9XCJNJysgXCIje3gxfSAje3kxfVwiICsnIEMgJytcIiAje3gxKygoeDIteDEpKjAuNSl9ICN7eTF9ICN7eDErKCh4Mi14MSkqMC41KX0gI3t5Mn0gI3t4Mn0gI3t5Mn1cIiArJ1wiIHN0cm9rZT1cIiNGRkZGRkZcIiBzdHJva2Utd2lkdGg9XCIyXCIgZmlsbD1cIm5vbmVcIiAvPlxuXHRcdDxjaXJjbGUgY3g9XCInKyBcIiN7eDJ9XCIgKydcIiBjeT1cIicrIFwiI3t5Mn1cIiArJ1wiIHI9XCI0XCIgc3Ryb2tlPVwibm9uZVwiIGZpbGw9XCIjRkZGRkZGXCIgLz5cblx0PC9zdmc+XG5cdCdcblx0cmV0dXJuIHN2Z1xuXG5jbGFzcyBleHBvcnRzLk5vZGVMaW5lcyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR3aWR0aDogMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IDBcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6MC4yXG5cdFx0XHRcdGN1cnZlOiBCZXppZXIuZWFzZVxuXHRcdFx0aHRtbDogZHJhd1NWRyhAb3B0aW9ucy54MSxAb3B0aW9ucy55MSxAb3B0aW9ucy54Miw1MClcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHgyID0gQG9wdGlvbnMueDJcblx0XHRAeDEgPSBAb3B0aW9ucy54MVxuXHRcdEB5MSA9IEBvcHRpb25zLnkxXG5cdFx0QC5zdGF0ZXMuY29sbGFwc2VkPVxuXHRcdFx0eTogMFxuXHRcdFx0c2NhbGVZOiAwXG5cdFx0XHRoZWlnaHQ6IDBcblx0XHRcdG9wYWNpdHk6IDBcblxuXG5cbmNsYXNzIExpc3RlbmVyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCdcblx0XHRcdGJvcmRlclJhZGl1czogZXhwb3J0cy5ib3JkZXJyYWRpdXNcblx0XHRcdGJvcmRlcldpZHRoOiAxXG5cdFx0XHRib3JkZXJDb2xvcjogZXhwb3J0cy5wcmltYXJ5TGlnaHRcblx0XHRcdHdpZHRoOiBleHBvcnRzLnNpdHVhdGlvbldpZHRoIC0gMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdGhlaWdodDogNDBcblx0XHRcdHg6IGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogMypleHBvcnRzLnBhZGRpbmdcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAbGFiZWwgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHRleHQ6IFwiRXZlbnQgTGlzdGVuZXJcIlxuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRwb2ludDogQWxpZ24uY2VudGVyXG5cblxuY2xhc3MgQnJpY2sgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogZXhwb3J0cy5wcmltYXJ5XG5cdFx0XHRoZWlnaHQ6IDEwMFxuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGhcblx0XHRcdHg6IDBcblx0XHRcdGJvcmRlcldpZHRoOiAxXG5cdFx0XHRib3JkZXJSYWRpdXM6IGV4cG9ydHMuYm9yZGVycmFkaXVzLzJcblx0XHRcdGJvcmRlckNvbG9yOiBleHBvcnRzLnByaW1hcnlMaWdodFxuXG5cdFx0QGxhYmVsID0gbmV3IFRleHRMYXllclxuXHRcdFx0dGV4dDogQG9wdGlvbnMudGl0bGVcblx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0eDogZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAbGFiZWwucGFyZW50ID0gQFxuXG5cblxuXG5cbmNsYXNzIENvbnRhaW5lciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR5OiAzKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTowLjJcblx0XHRcdFx0Y3VydmU6IEJlemllci5lYXNlXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHNjcm9sbENvbXAgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiBleHBvcnRzLnNpdHVhdGlvbldpZHRoXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCdcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRvdmVyZHJhZzogdHJ1ZVxuXG5cdFx0QHNjcm9sbENvbXAubW91c2VXaGVlbEVuYWJsZWQgPSB0cnVlXG5cblxuXHRcdEAuc3RhdGVzLmNvbGxhcHNlZD1cblx0XHRcdHk6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRzY2FsZVk6IDBcblx0XHRcdGhlaWdodDogMFxuXHRcdFx0b3BhY2l0eTogMFxuXG5cblxuXG5cbmNsYXNzIGV4cG9ydHMuU2l0dWF0aW9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IEBvcHRpb25zLmxcblx0XHRcdGZvbnRTaXplOiAxNlxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0dGV4dFRyYW5zZm9ybTogXCJ1cHBlcmNhc2VcIlxuXHRcdFx0Zm9udFdlaWdodDogXCI3MDBcIlxuXHRcdFx0bGV0dGVyU3BhY2luZzogMlxuXHRcdFx0eDogMypleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IGV4cG9ydHMucGFkZGluZ1xuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogZXhwb3J0cy5wcmltYXJ5XG5cdFx0XHRoZWlnaHQ6IDMqZXhwb3J0cy5wYWRkaW5nICsgZXhwb3J0cy5ib3JkZXJyYWRpdXNcblx0XHRcdHdpZHRoOiBleHBvcnRzLnNpdHVhdGlvbldpZHRoXG5cdFx0XHRib3JkZXJSYWRpdXM6IGV4cG9ydHMuYm9yZGVycmFkaXVzXG5cdFx0XHRib3JkZXJXaWR0aDogMVxuXHRcdFx0Ym9yZGVyQ29sb3I6IGV4cG9ydHMucHJpbWFyeUxpZ2h0XG5cdFx0XHR4OiAyKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogMipleHBvcnRzLnBhZGRpbmdcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAbGFiZWwucGFyZW50ID0gQFxuXG5cdFx0QGNvbnRhaW5lciA9IG5ldyBDb250YWluZXJcblx0XHRcdHBhcmVudDogQFxuXG5cdFx0YnJpY2tzID0gW11cblx0XHRmb3IgY2hpbGQsIGkgaW4gQG9wdGlvbnMubm9kZXNcblx0XHRcdGJyaWNrcy5wdXNoIG5ldyBCcmlja1xuXHRcdFx0XHR5OiBpKjEwMFxuXHRcdFx0XHRwYXJlbnQ6IEBjb250YWluZXIuc2Nyb2xsQ29tcC5jb250ZW50XG5cdFx0XHRcdHRpdGxlOiBjaGlsZFxuXG5cdFx0YnJpY2tzLnB1c2ggbmV3IEJyaWNrXG5cdFx0XHR5OiBicmlja3MubGVuZ3RoKjEwMFxuXHRcdFx0cGFyZW50OiBAY29udGFpbmVyLnNjcm9sbENvbXAuY29udGVudFxuXHRcdFx0dGl0bGU6IFwiKyBBZGQgbmV3IGJyaWNrXCJcblxuXHRcdGV4cG9ydHMubGlzdGVuZXJzLnB1c2ggbmV3IExpc3RlbmVyXG5cdFx0XHRwYXJlbnQ6IGJyaWNrc1ticmlja3MubGVuZ3RoLTJdXG5cdFx0XHRuYW1lOiBcIkxpc3RlbmVyXCJcblxuXHRcdEBicmljayA9IGJyaWNrc1ticmlja3MubGVuZ3RoLTJdXG5cblx0XHRpZiAoQGNvbnRhaW5lci5zY3JvbGxDb21wLmNvbnRlbnQuaGVpZ2h0IDwgNjIwKVxuXHRcdFx0QGNvbnRhaW5lci5zY3JvbGxDb21wLmhlaWdodCA9IEBjb250YWluZXIuc2Nyb2xsQ29tcC5jb250ZW50LmhlaWdodFxuXHRcdGVsc2Vcblx0XHRcdEBjb250YWluZXIuc2Nyb2xsQ29tcC5oZWlnaHQgPSA2MjBcblxuXHRcdEB0cmkgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IDIwXG5cdFx0XHRoZWlnaHQ6IDIwXG5cdFx0XHR4OmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0XCJiYWNrZ3JvdW5kXCIgOiBcInVybChpbWFnZXMvdHJpLnN2ZykgICBuby1yZXBlYXRcIlxuXHRcdFx0XHRcImJhY2tncm91bmQtcG9zaXRpb25cIjpcImxlZnQgY2VudGVyXCJcblx0XHRcdFx0XCJiYWNrZ3JvdW5kLXNpemVcIiA6IFwiY29udGFpblwiXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOjAuMlxuXHRcdFx0XHRjdXJ2ZTogQmV6aWVyLmVhc2VcblxuXHRcdEB0cmkuc3RhdGVzLmNvbGxhcHNlZD1cblx0XHRcdHJvdGF0aW9uOiAtOTBcblxuXG5cdFx0QG5vZGVMaW5lID0gbmV3IGV4cG9ydHMuTm9kZUxpbmVzXG5cdFx0XHRwYXJlbnQgOiBAb3B0aW9ucy5wXG5cdFx0XHR4OiAwI0AueCArIEAud2lkdGggLSBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IDAjMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdHdpZHRoOiBzY3JlZW4ud2lkdGhcblx0XHRcdGhlaWdodDogc2NyZWVuLmhlaWdodFxuXHRcdFx0eTE6IEBicmljay5zY3JlZW5GcmFtZS55ICsgQGJyaWNrLmhlaWdodC8yICsgZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR4MTogQC54ICsgQC53aWR0aCAtIGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eDI6IEAueCArIEAud2lkdGggKyAyKmV4cG9ydHMucGFkZGluZ1xuXG5cdFx0ZXhwb3J0cy5ub2RlTGlua3MucHVzaCBAbm9kZUxpbmVcblxuXHRcdEB0cmkub25DbGljayBAVG9nZ2xlXG5cblx0VG9nZ2xlOiA9PlxuXHRcdEBjb250YWluZXIuc3RhdGVDeWNsZSBcImNvbGxhcHNlZFwiLCBcImRlZmF1bHRcIlxuXHRcdEB0cmkuc3RhdGVDeWNsZSBcImNvbGxhcHNlZFwiLCBcImRlZmF1bHRcIlxuXHRcdEBub2RlTGluZS5zdGF0ZUN5Y2xlIFwiY29sbGFwc2VkXCIsIFwiZGVmYXVsdFwiXG5cblxuXG5cblxuXG5jbGFzcyBleHBvcnRzLkRyYWdIYW5kbGUgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0dGhhdCA9IEBvcHRpb25zLnBcblx0XHRsYXN0ID0gQG9wdGlvbnMucGxhc3RcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR3aWR0aDogMjBcblx0XHRcdGhlaWdodDogMjBcblx0XHRcdHg6IHRoYXQueCArIHRoYXQud2lkdGggLSAyMCAtIGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogdGhhdC55ICsgZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0XCJiYWNrZ3JvdW5kXCIgOiBcInVybChpbWFnZXMvSWNvbnMvZHJhZy5zdmcpICAgbm8tcmVwZWF0XCJcblx0XHRcdFx0XCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCI6XCJsZWZ0IGNlbnRlclwiXG5cdFx0XHRcdFwiYmFja2dyb3VuZC1zaXplXCIgOiBcImNvbnRhaW5cIlxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRALmRyYWdnYWJsZS5lbmFibGVkID0gdHJ1ZVxuXHRcdEAuZHJhZ2dhYmxlLmNvbnN0cmFpbnRzID0ge1xuXHRcdFx0eDogQC54XG5cdFx0XHR5OiBALnlcblx0XHRcdHdpZHRoOiAwXG5cdFx0XHRoZWlnaHQ6IDBcblx0XHR9XG5cdFx0QC5vbiBFdmVudHMuTW92ZSwgLT5cblx0XHRcdHRoYXQueCA9IEAueCAtIHRoYXQud2lkdGggKyBleHBvcnRzLnBhZGRpbmcgKyAyMFxuXHRcdFx0dGhhdC55ID0gQC55IC0gZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR0aGF0LmJyaW5nVG9Gcm9udCgpXG5cdFx0XHR5MSA9IHRoYXQuYnJpY2suc2NyZWVuRnJhbWUueSArIHRoYXQuYnJpY2suaGVpZ2h0LzIgKyBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHgxID0gdGhhdC5icmljay5zY3JlZW5GcmFtZS54ICsgdGhhdC5icmljay53aWR0aCAtIGV4cG9ydHMucGFkZGluZyAtIGV4cG9ydHMuc2Nyb2xsZWRcblx0XHRcdHgyID0gdGhhdC5ub2RlTGluZS54MlxuXHRcdFx0dGhhdC5ub2RlTGluZS5odG1sID0gZHJhd1NWRyh4MSx5MSx4Miw1MClcblxuXHRcdFx0aWYgbGFzdFxuXHRcdFx0XHRsYXN0eTIgPSBALnNjcmVlbkZyYW1lLnkgKyBALmhlaWdodC8yXG5cdFx0XHRcdGxhc3R4MiA9IHRoYXQuYnJpY2suc2NyZWVuRnJhbWUueCAtIGV4cG9ydHMuc2Nyb2xsZWRcblx0XHRcdFx0bGFzdHgxID0gbGFzdC5ub2RlTGluZS54MVxuXHRcdFx0XHRsYXN0eTEgPSBsYXN0Lm5vZGVMaW5lLnkxXG5cdFx0XHRcdGxhc3Qubm9kZUxpbmUuaHRtbCA9IGRyYXdTVkcobGFzdHgxLGxhc3R5MSxsYXN0eDIsbGFzdHkyKVxuXG5cbmNsYXNzIGV4cG9ydHMuTmV3U2l0dWF0aW9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IFwiTmV3IFNpdHVhdGlvblwiXG5cdFx0XHRmb250U2l6ZTogMTZcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdHRleHRUcmFuc2Zvcm06IFwidXBwZXJjYXNlXCJcblx0XHRcdGZvbnRXZWlnaHQ6IFwiNzAwXCJcblx0XHRcdGxldHRlclNwYWNpbmc6IDJcblx0XHRcdHg6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblxuXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBleHBvcnRzLnByaW1hcnlcblx0XHRcdGhlaWdodDogMypleHBvcnRzLnBhZGRpbmcgKyBleHBvcnRzLmJvcmRlcnJhZGl1c1xuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGhcblx0XHRcdGJvcmRlclJhZGl1czogZXhwb3J0cy5ib3JkZXJyYWRpdXNcblx0XHRcdGJvcmRlcldpZHRoOiAxXG5cdFx0XHRib3JkZXJDb2xvcjogZXhwb3J0cy5wcmltYXJ5TGlnaHRcblx0XHRcdHg6IDIqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAyKmV4cG9ydHMucGFkZGluZ1xuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBsYWJlbC5wYXJlbnQgPSBAXG5cblx0XHRAY29udGFpbmVyID0gbmV3IENvbnRhaW5lclxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHRAbmV3QnJpY2sgPSBuZXcgQnJpY2tcblx0XHRcdHk6IDBcblx0XHRcdHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0dGl0bGU6IFwiKyBBZGQgbmV3IGJyaWNrXCJcblxuXHRcdEBuZXdCcmljay5vbkNsaWNrIC0+XG5cdFx0XHRicmlja05hbWUgPSBwcm9tcHQgXCJCcmljayBOYW1lXCJcblx0XHRcdHByaW50IGJyaWNrTmFtZVxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIu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
