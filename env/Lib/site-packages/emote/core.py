# -*- coding: UTF-8 -*-


"""
Core components for Emote
"""


from . import emoji_codes


__all__ = ['lookup', 'decode']


def lookup(emoji_name):

    """
    Given an emoji name return its unicode string.  Emoji names can be wrapped
    in colons.

    Example:

        >>> import emote
        >>> print(emote.lookup('water_wave'))
        🌊
        >>> print(emote.lookup(':whale:'))
        🐋

    Parameters
    ----------
    emoji_name : str
        Name of desired emoji.  Something like 'water' or ':whale:'.

    Raises
    ------
    ValueError
        Emoji name is unrecognized.

    Returns
    -------
    str
        Escaped unicode string representing the desired emoji.
    """

    try:
        return emoji_codes.CODES[emoji_name.strip(':')]
    except KeyError:
        raise ValueError("Unrecognized emoji name: %s" % emoji_name)


def decode(string):

    """
    Given a string return the name of the associated emoji.

    Parameters
    ----------
    string : str
        String associated with an emoji.

    Raises
    ------
    ValueError
        Unrecognized string.

    Returns
    -------
    str
        Name of associated emoji.
    """

    try:
        return emoji_codes.UNICODE_LOOKUP[string]
    except KeyError:
        raise ValueError("String is not associated with an emoji: %s" % string)
