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

exports.NodeLines = (function(superClass) {
  extend(NodeLines, superClass);

  function NodeLines(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      backgroundColor: null,
      width: 2 * exports.padding,
      y: 0,
      html: '<svg> <path d="M0 ' + ("" + this.options.yy) + ' C 20 ' + ("" + this.options.yy) + ' 25 0 ' + 45 + ' 0" stroke="#CC0026" stroke-width="2" fill="none" /> </svg>'
    });
    NodeLines.__super__.constructor.call(this, this.options);
  }

  return NodeLines;

})(Layer);

exports.NodeLink = (function(superClass) {
  extend(NodeLink, superClass);

  function NodeLink(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      backgroundColor: exports.secondary,
      borderRadius: exports.borderradius,
      width: 2 * exports.borderradius,
      height: 2 * exports.borderradius
    });
    NodeLink.__super__.constructor.call(this, this.options);
  }

  return NodeLink;

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
      backgroundColor: "transparent",
      y: 3 * exports.padding,
      animationOptions: {
        time: 0.2,
        curve: Bezier.ease
      }
    });
    Container.__super__.constructor.call(this, this.options);
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
        parent: this.container,
        title: child
      }));
    }
    bricks.push(new Brick({
      y: i * 100,
      parent: this.container,
      title: "+ Add new brick"
    }));
    exports.listeners.push(new Listener({
      parent: bricks[i - 1],
      name: "Listener"
    }));
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
    this.tri.onClick(this.Toggle);
  }

  Situation.prototype.Toggle = function() {
    this.container.stateCycle("collapsed", "default");
    return this.tri.stateCycle("collapsed", "default");
  };

  return Situation;

})(Layer);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbm9zL1NpdGVzL0F0aGVuYS1OQlMvQXRoZW5hLU5CUy5mcmFtZXIvbW9kdWxlcy9uYnMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzLnBhZGRpbmcgPSAxNVxuZXhwb3J0cy5zaXR1YXRpb25XaWR0aCA9IDMwMFxuZXhwb3J0cy5ib3JkZXJyYWRpdXMgPSA0XG5cbmV4cG9ydHMucHJpbWFyeSA9IFwiIzAwMjAzRFwiXG5leHBvcnRzLnByaW1hcnlMaWdodCA9IFwiIzRENjM3N1wiXG5leHBvcnRzLnNlY29uZGFyeSA9IFwiI0NDMDAyNlwiXG5cbmV4cG9ydHMubGlzdGVuZXJzID0gW11cblxuY2xhc3MgZXhwb3J0cy5Ob2RlTGluZXMgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0d2lkdGg6IDIqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAwXG5cdFx0XHRodG1sOiAnXG5cdFx0XHQ8c3ZnPlxuXHRcdFx0ICA8cGF0aCBkPVwiTTAgJysgXCIje0BvcHRpb25zLnl5fVwiICsnIEMgMjAgJysgXCIje0BvcHRpb25zLnl5fVwiICsnIDI1IDAgJysgNDUgKycgMFwiIHN0cm9rZT1cIiNDQzAwMjZcIiBzdHJva2Utd2lkdGg9XCIyXCIgZmlsbD1cIm5vbmVcIiAvPlxuXHRcdFx0PC9zdmc+XG5cdFx0XHQnXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5jbGFzcyBleHBvcnRzLk5vZGVMaW5rIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGV4cG9ydHMuc2Vjb25kYXJ5XG5cdFx0XHRib3JkZXJSYWRpdXM6IGV4cG9ydHMuYm9yZGVycmFkaXVzXG5cdFx0XHR3aWR0aDogMipleHBvcnRzLmJvcmRlcnJhZGl1c1xuXHRcdFx0aGVpZ2h0OiAyKmV4cG9ydHMuYm9yZGVycmFkaXVzXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cblxuXG5jbGFzcyBMaXN0ZW5lciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnXG5cdFx0XHRib3JkZXJSYWRpdXM6IGV4cG9ydHMuYm9yZGVycmFkaXVzXG5cdFx0XHRib3JkZXJXaWR0aDogMVxuXHRcdFx0Ym9yZGVyQ29sb3I6IGV4cG9ydHMucHJpbWFyeVxuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGggLSAyKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0aGVpZ2h0OiA0MFxuXHRcdFx0eDogZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAzKmV4cG9ydHMucGFkZGluZ1xuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0dGV4dDogXCJFdmVudCBMaXN0ZW5lclwiXG5cdFx0XHRmb250U2l6ZTogMTJcblx0XHRcdGNvbG9yOiBcImJsYWNrXCJcblx0XHRcdHg6IGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogZXhwb3J0cy5wYWRkaW5nXG5cbmNsYXNzIEJyaWNrIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiI0NDQ1wiXG5cdFx0XHRoZWlnaHQ6IDEwMFxuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGhcblx0XHRcdHg6IDBcblx0XHRcdGJvcmRlcldpZHRoOiAxXG5cdFx0XHRib3JkZXJDb2xvcjogZXhwb3J0cy5zZWNvbmRhcnlcblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IEBvcHRpb25zLnRpdGxlXG5cdFx0XHRmb250U2l6ZTogMTJcblx0XHRcdGNvbG9yOiBcImJsYWNrXCJcblx0XHRcdHg6IGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogZXhwb3J0cy5wYWRkaW5nXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGxhYmVsLnBhcmVudCA9IEBcblxuXG5cblxuXG5jbGFzcyBDb250YWluZXIgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0XHR5OiAzKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTowLjJcblx0XHRcdFx0Y3VydmU6IEJlemllci5lYXNlXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QC5zdGF0ZXMuY29sbGFwc2VkPVxuXHRcdFx0eTogMypleHBvcnRzLnBhZGRpbmdcblx0XHRcdHNjYWxlWTogMFxuXHRcdFx0aGVpZ2h0OiAwXG5cdFx0XHRvcGFjaXR5OiAwXG5cblxuXG5cblxuY2xhc3MgZXhwb3J0cy5TaXR1YXRpb24gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0QGxhYmVsID0gbmV3IFRleHRMYXllclxuXHRcdFx0dGV4dDogXCJFdmVudCBOYW1lXCJcblx0XHRcdGZvbnRTaXplOiAxNlxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0eDogMypleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IGV4cG9ydHMucGFkZGluZ1xuXG5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGV4cG9ydHMucHJpbWFyeVxuXHRcdFx0aGVpZ2h0OiAzKmV4cG9ydHMucGFkZGluZyArIGV4cG9ydHMuYm9yZGVycmFkaXVzXG5cdFx0XHR3aWR0aDogZXhwb3J0cy5zaXR1YXRpb25XaWR0aFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiBleHBvcnRzLmJvcmRlcnJhZGl1c1xuXHRcdFx0eDogMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IDIqZXhwb3J0cy5wYWRkaW5nXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGxhYmVsLnBhcmVudCA9IEBcblxuXHRcdEBjb250YWluZXIgPSBuZXcgQ29udGFpbmVyXG5cdFx0XHRwYXJlbnQ6IEBcblxuXHRcdGJyaWNrcyA9IFtdXG5cdFx0Zm9yIGNoaWxkLCBpIGluIEBvcHRpb25zLm5vZGVzXG5cdFx0XHRicmlja3MucHVzaCBuZXcgQnJpY2tcblx0XHRcdFx0eTogaSoxMDBcblx0XHRcdFx0cGFyZW50OiBAY29udGFpbmVyXG5cdFx0XHRcdHRpdGxlOiBjaGlsZFxuXHRcdGJyaWNrcy5wdXNoIG5ldyBCcmlja1xuXHRcdFx0eTogaSoxMDBcblx0XHRcdHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0dGl0bGU6IFwiKyBBZGQgbmV3IGJyaWNrXCJcblxuXHRcdGV4cG9ydHMubGlzdGVuZXJzLnB1c2ggbmV3IExpc3RlbmVyXG5cdFx0XHRwYXJlbnQ6IGJyaWNrc1tpLTFdXG5cdFx0XHRuYW1lOiBcIkxpc3RlbmVyXCJcblxuXHRcdEB0cmkgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IDIwXG5cdFx0XHRoZWlnaHQ6IDIwXG5cdFx0XHR4OmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0XCJiYWNrZ3JvdW5kXCIgOiBcInVybChpbWFnZXMvdHJpLnN2ZykgICBuby1yZXBlYXRcIlxuXHRcdFx0XHRcImJhY2tncm91bmQtcG9zaXRpb25cIjpcImxlZnQgY2VudGVyXCJcblx0XHRcdFx0XCJiYWNrZ3JvdW5kLXNpemVcIiA6IFwiY29udGFpblwiXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOjAuMlxuXHRcdFx0XHRjdXJ2ZTogQmV6aWVyLmVhc2VcblxuXHRcdEB0cmkuc3RhdGVzLmNvbGxhcHNlZD1cblx0XHRcdHJvdGF0aW9uOiAtOTBcblxuXHRcdEB0cmkub25DbGljayBAVG9nZ2xlXG5cblx0VG9nZ2xlOiA9PlxuXHRcdEBjb250YWluZXIuc3RhdGVDeWNsZSBcImNvbGxhcHNlZFwiLCBcImRlZmF1bHRcIlxuXHRcdEB0cmkuc3RhdGVDeWNsZSBcImNvbGxhcHNlZFwiLCBcImRlZmF1bHRcIlxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFDQUE7QURBQSxJQUFBLDBCQUFBO0VBQUE7Ozs7QUFBQSxPQUFPLENB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
